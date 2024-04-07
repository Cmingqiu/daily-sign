<template>
  <view class="wrapper">
    <view class="content">
      <slot />
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  padding: 20rpx;
  .content {
    min-height: calc(100vh - 40rpx);
    border-radius: 30rpx;
    padding: 20rpx;
    background-color: $uni-bg-color;
    position: relative;
  }
}
</style>
