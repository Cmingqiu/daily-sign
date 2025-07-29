<template>
  <div v-for="i in 50" :key="i">二级页</div>
  <view v-if="isShow">
    <page-container
      :show="isShow"
      round
      @beforeleave="beforeleave"
      @clickoverlay="clickoverlay"></page-container>
  </view>
</template>

<script setup lang="ts">
import { onBackPress, onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const isShow = ref(true);
const beforeleave = (...args: any[]) => {
  console.log(...args);
  isShow.value = false; //这个很重要，一定要先把弹框删除掉，必须先隐藏page-container
  uni.showModal({
    confirmColor: '#bd3124',
    title: '您盘点的商品尚未保存，是否保存后再离开页面?',
    success: e => {
      if (e.confirm) {
        console.log('确认盘点接口');
        // 返回上一页
        uni.navigateBack({
          delta: 1
        });
      } else {
      }
    }
  });
};

const clickoverlay = (...args: any[]) => {
  console.log('clickoverlay', ...args);
};

// #ifndef MP-WEIXIN
const quitFlag = ref(true);
uni.addInterceptor('navigateBack', {
  invoke: () => {
    console.log('addInterceptor');
    if (quitFlag.value) {
      uni.showModal({
        title: ' this.title',
        content: ' this.content',
        showCancel: true,
        success: ({ confirm }) => {
          if (confirm) {
            quitFlag.value = false;
            uni.navigateBack({ delta: 1 });
            return false;
          } else {
          }
        }
      });
      return false;
    }
  },
  complete: () => {
    // 删除拦截器
    uni.removeInterceptor('navigateBack');
  }
});
// #endif
</script>

<style lang="scss" scoped></style>
