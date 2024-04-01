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
import { onLoad, onShow } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { ref, computed } from 'vue';

// 工作日
const isWorkDay = dayjs().day() !== 0 && dayjs().day() !== 6;

const currentTime = ref<Date>(); // 当前时间
const isForenoonSigned = ref<Boolean>(false); // 上午是否打卡了
const isAfternoonSigned = ref<Boolean>(false); // 下午是否打卡了

// 判断当前时间是上班[0,12)还是下班[12,24)
const isForenoon = computed(() => {
  const hour = dayjs().hour();
  return 0 <= hour && hour < 12;
});
// 休息日||工作日打完下班卡
const notNeedSign = computed(
  () => (isWorkDay && isAfternoonSigned.value) || !isWorkDay
);
const time = computed(() => dayjs(currentTime.value).format('HH:mm:ss'));
const signButtonTitle = computed(() => {
  if (isForenoonSigned.value && isAfternoonSigned.value) return '今日已打卡';
  if (isForenoon.value && !isForenoonSigned.value) return '上班打卡';
  else if (
    // 上午打了上班卡 或者 下午没打下班卡
    (isForenoon.value && isForenoonSigned.value) ||
    (!isForenoon.value && !isAfternoonSigned.value)
  )
    return '下班打卡';
  return '今日结束啦~';
});

setInterval(() => (currentTime.value = new Date()), 500);

/*打卡 structure
'2024-03-31':['11:41:21':'17:30:32']
*/
const sign = () => {
  if (notNeedSign.value) return;
  const CACHE_KEYS = dayjs().format('YYYY-MM-DD');
  const todaySignRecord = uni.getStorageSync(CACHE_KEYS) || [];
  const t = dayjs(currentTime.value).format('HH:mm:ss');

  todaySignRecord[isForenoon.value ? 0 : 1] = t;
  if (todaySignRecord.length === 1) isForenoonSigned.value = true;
  else if (todaySignRecord.length === 2) isAfternoonSigned.value = true;
  uni.setStorageSync(CACHE_KEYS, todaySignRecord);
};

// 跳转打卡记录
const jumpToRecord = () => {
  uni.navigateTo({ url: '/pages/record/index' });
};

const initState = () => {
  clearBeforeMonthCache();
  if (isWorkDay) {
    const todaySignRecord =
      uni.getStorageSync(dayjs().format('YYYY-MM-DD')) || [];
    isForenoonSigned.value = !!todaySignRecord[0];
    isAfternoonSigned.value = !!todaySignRecord[1];
  }
};

onLoad(initState);
onShow(initState);

// 31天之前的缓存都会清除
function clearBeforeMonthCache() {
  const now = new Date().getTime(),
    oneDay = 1000 * 60 * 60 * 24,
    interval = 31;
  const signedCacheKeys = uni.getStorageInfoSync().keys;
  signedCacheKeys.forEach(key => {
    if (Math.floor((now - new Date(key).getTime()) / oneDay) >= interval) {
      uni.removeStorageSync(key);
    }
  });
}
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
