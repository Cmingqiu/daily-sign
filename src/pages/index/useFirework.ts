import { ref } from 'vue';
export default function (cb?: () => void) {
  const toggle = ref(true); // 开关防抖
  const confettiRef = ref(); // 礼花组件

  // 礼花动画开始
  function createFirework() {
    confettiRef.value.play({
      particleCount: 220,
      spread: 70,
      gravity: 2
    });
  }
  // 礼花动画结束
  function fireworkFinish() {
    cb && cb();
    toggle.value = true;
  }

  return { createFirework, fireworkFinish, confettiRef, toggle };
}
