import {
  Confetti,
  ConfettiEjector,
  CanvasRender,
  CustomShape
} from 'confetti-ts-canvas';

export default function (cb?: () => void) {
  let createFirework: () => void, canvasRender: CanvasRender;

  const g = uni.createCanvasContext('canvas');
  canvasRender = new CanvasRender();
  canvasRender.init(
    //必填 CanvasContext
    g,
    //以下参数全部可选填入
    {
      width: 375,
      height: 667
    },
    {
      onFinished() {
        cb && cb();
      },
      displayFps: false,
      gravity: 3
    }
  );

  createFirework = () => {
    const pao = new ConfettiEjector(canvasRender, {
      limitAngle: [225, 315], //喷发角度区间[-∞,+∞]
      count: 150 //喷发纸片数量
    });

    const boom = pao.create({
      x: 0,
      y: 0, //喷发位置
      clampforce: [20, 60], //喷发力度
      radius: 10 //纸片大小
    });
    pao.fire(boom);
  };
  return { createFirework };
}
