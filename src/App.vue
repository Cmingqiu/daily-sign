<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(params => {
  console.log('App Launch', params?.scene);
  wx.getUserInfo({
    desc: '获取用户信息',
    success(res) {
      console.log('获取用户信息', res);
    },
    fail(res) {
      console.log('fail', res);
    }
  });
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
@import 'uview-plus/index.scss';
@import '@/styles/index.scss';
</style>
