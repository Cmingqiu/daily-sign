<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(params => {
  console.log('App Launch', params?.scene);
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
