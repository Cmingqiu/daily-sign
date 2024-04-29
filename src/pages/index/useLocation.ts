import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
// @ts-ignore
import AMapWX from '@/utils/sdk/amap-wx.130.js';
import { AMAP_KEY } from '@/config/const';

export default function () {
  const address = ref('');

  onShow(() => {
    // #ifdef MP-WEIXIN
    const aMapInstance = new AMapWX({ key: AMAP_KEY });
    aMapInstance.getRegeo({
      success(data: any) {
        address.value = data?.[0]?.name ?? '';
      }
    });

    /*  wx.getPrivacySetting({
      success(res) {
        console.log(res);
        if (res.needAuthorization) {
          // 打开隐私协调弹框
        } else {
          // wx.openPrivacyContract({});
          uni.getLocation({
            type: 'wgs84',
            success(res) {
              console.log('====', res);
            },
            fail() {
              uni.showToast({
                title: '未授权获取位置功能，可在右上角设置中打开位置',
                icon: 'none'
              });
            }
          });
        }
      }
    }); */
    // #endif
  });
  return { address };
}
