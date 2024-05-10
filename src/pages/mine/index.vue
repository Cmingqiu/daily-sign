<template>
  <LayoutContainer>
    <view flex items-center>
      <button
        class="rounded-[50%]"
        w-100
        h-100
        ml-3
        mr-3
        px-0
        overflow-hidden
        text-center
        open-type="chooseAvatar"
        @chooseavatar="chooseAvatar">
        <!-- <open-data type="userAvatarUrl" /> -->
        <image w-100 h-100 :src="avatarUrl" mode="scaleToFill" />
      </button>

      <open-data font-bold type="userNickName" />
    </view>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const defaultAvatar =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const avatarUrl = ref(defaultAvatar);
const chooseAvatar = (e: any) => {
  avatarUrl.value = e.detail.avatarUrl;
  /* uni.getUserProfile({
    desc: 'xx',
    success(result) {
      console.log('getUserProfile ', result);
    }
  }); */
};
onLoad(() => {
  uni.getSetting({
    success(res) {
      console.log('getSetting ', res);
    }
  });
});
</script>

<style lang="scss" scoped></style>
