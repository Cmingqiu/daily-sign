<template>
  <view class="wrapper">
    <scroll-view class="content" scroll-y scroll-x>
      <slot />
    </scroll-view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  padding: 20rpx;
  height: 100vh;
  .content {
    height: 100%;
    border-radius: 30rpx;
    padding: 20rpx;
    background-color: $uni-bg-color;
    position: relative;
  }
}
</style>
