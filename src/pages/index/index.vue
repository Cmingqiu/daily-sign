<template>
  <LayoutContainer>
    <view class="home">
      <view class="result-row">
        <view class="button">
          <text>上班8:30</text>
          <text>{{ isForenoonSigned ? '已' : '未' }}打卡</text>
        </view>
        <view class="button">
          <text>下班17:30</text>
          <text>{{ isAfternoonSigned ? '已' : '未' }}打卡</text>
        </view>
      </view>

      <view :class="['sign-button', notNeedSign && 'disabled']" @click="sign">
        <view class="title" v-if="isWorkDay">{{ signButtonTitle }} </view>
        <view class="title" v-else>今日休息</view>
        <view class="time">{{ time }}</view>
      </view>
      <view class="record-button" @click="jumpToRecord">打卡记录</view>
    </view>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { ref, computed } from 'vue';

// 工作日
const isWorkDay = dayjs().day() !== 0 && dayjs().day() !== 6;

const currentTime = ref<Date>(); // 当前时间
const isForenoonSigned = ref<Boolean>(false); // 上午是否打卡了
const isAfternoonSigned = ref<Boolean>(false); // 下午是否打卡了

// 今天是工作日且是否都打完卡了
const notNeedSign = computed(
  () =>
    (isWorkDay && isForenoonSigned.value && isAfternoonSigned.value) ||
    !isWorkDay
);
const time = computed(() => dayjs(currentTime.value).format('HH:mm:ss'));
const signButtonTitle = computed(() => {
  if (isForenoonSigned.value && isAfternoonSigned.value) return '今日已打卡';
  else if (!isForenoonSigned.value) return '上班打卡';
  else if (!isAfternoonSigned.value) return '下班打卡';
});

setInterval(() => (currentTime.value = new Date()), 500);

/*打卡 structure
'2024-03-31':['11:41:21':'17:30:32']
*/
const sign = () => {
  if (notNeedSign.value) return;
  const CACHE_KEYS = dayjs().format('YYYY-MM-DD');
  const todaySignRecord = uni.getStorageSync(CACHE_KEYS) || [];
  if (!todaySignRecord.length) isForenoonSigned.value = true;
  else if (todaySignRecord.length === 1) isAfternoonSigned.value = true;
  todaySignRecord.push(dayjs(currentTime.value).format('HH:mm:ss'));
  uni.setStorageSync(CACHE_KEYS, todaySignRecord);
};

// 跳转打卡记录
const jumpToRecord = () => {
  uni.navigateTo({ url: '/pages/record/index' });
};

onLoad(() => {
  if (isWorkDay) {
    const todaySignRecord =
      uni.getStorageSync(dayjs().format('YYYY-MM-DD')) || [];
    isForenoonSigned.value = !!todaySignRecord[0];
    isAfternoonSigned.value = !!todaySignRecord[1];
  }
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  .result-row {
    display: flex;
    justify-content: center;
    margin-top: 20rpx;
    .button {
      width: 280rpx;
      border-radius: 8rpx;
      background-color: $uni-bg-color-hover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 10rpx;
      text:last-child {
        font-size: 24rpx;
        margin-top: 10rpx;
        color: $uni-text-color-disable;
      }
      &:first-child {
        margin-right: 20rpx;
      }
    }
  }

  .sign-button {
    width: 300rpx;
    height: 300rpx;
    border-radius: 50%;
    margin-top: 280rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $uni-text-color-inverse;
    background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));
    position: relative;
    .title {
      font-size: 38rpx;
      margin-bottom: 20rpx;
    }
    &.disabled::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.6);
    }
  }

  .record-button {
    text-align: center;
    color: rgb(111, 12, 250);
    margin-top: 20rpx;
  }
}
</style>
