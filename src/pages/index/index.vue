<template>
  <view class="wrap">
    <view class="content">
      <view class="result-row">
        <view class="button">
          <text>上班8：30</text>
          <text>{{ '已未' }}打卡</text>
        </view>
        <view class="button">
          <text>下班17：30</text>
          <text>{{ '已未' }}打卡</text>
        </view>
      </view>

      <view :class="['sign-button', isSigned && 'disabled']" @click="sign">
        <view class="title">{{ halfDay }}打卡</view>
        <view class="time">{{ time }}</view>
      </view>
      <view class="record-button" @click="jumpToRecord">打卡记录</view>

      <!-- <u-button
      text="打卡"
      shape="circle"
      color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" /> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import { CACHE_KEYS } from '@/config/enums';

const currentTime = ref<Date>(new Date()); // 当前时间
const isSigned = ref<Boolean>(false); // 是否打卡

const time = computed(() => dayjs(currentTime.value).format('HH:mm:ss'));
const halfDay = computed(() => {
  const hour = dayjs(currentTime.value).hour(); //+time.value.slice(0, 2);
  if (0 < hour && hour < 12) return '上班';
  else return '下班';
});

setInterval(() => (currentTime.value = new Date()), 500);

// 打卡
const sign = () => {
  if (isSigned.value) return;
  isSigned.value = true;
  const signRecordList = uni.getStorageSync(CACHE_KEYS.SIGN_RECORD_LIST) || [];
  // uni.setStorageSync(CACHE_KEYS.SIGN_RECORD_LIST,signRecordList);
};

/* function getTime() {
  time.value = dayjs().format('HH:mm:ss');
  requestAnimationFrame(getTime);
}
getTime(); */

// 跳转打卡记录
const jumpToRecord = () => {
  uni.navigateTo({ url: '/pages/record/index' });
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  height: 100vh;
}
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40rpx;
  background-color: $uni-bg-color;
  .result-row {
    display: flex;
    justify-content: space-between;
    .button {
      width: 200rpx;
      height: 180rpx;
      background-color: $uni-bg-color-grey;
    }
  }

  .sign-button {
    width: 300rpx;
    height: 300rpx;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $uni-text-color-inverse;
    background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));
    .title {
      font-size: 38rpx;
      margin-bottom: 20rpx;
    }
    &.disabled {
      background: $uni-bg-color-mask;
    }
  }

  .record-button {
    text-align: center;
    color: rgb(111, 12, 250);
    margin-top: 20rpx;
  }
}
</style>
