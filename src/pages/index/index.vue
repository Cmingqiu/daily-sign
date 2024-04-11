<template>
  <LayoutContainer>
    <view class="home">
      <view class="result-row">
        <view class="button">
          <text>上班8:30</text>
          <view flex items-center mt-1>
            <u-icon
              v-if="isForenoonSigned"
              name="checkmark-circle-fill"
              color="rgb(136, 22, 236)"
              size="28"></u-icon>
            <text ml-1>{{ isForenoonSigned ? '已' : '未' }}打卡</text>
          </view>
        </view>
        <view class="button">
          <text>下班17:30</text>

          <view flex items-center mt-1>
            <u-icon
              v-if="isAfternoonSigned"
              name="checkmark-circle-fill"
              color="rgb(136, 22, 236)"
              size="28"></u-icon>
            <text ml-1>{{ isAfternoonSigned ? '已' : '未' }}打卡</text>
          </view>
        </view>
      </view>

      <view
        :class="['sign-button', (notNeedSign || !toggle) && 'disabled']"
        @click="sign">
        <view class="title">{{ signButtonTitle }} </view>
        <view class="time">{{ time }}</view>
      </view>
      <view class="record-button" @click="jumpToRecord">打卡记录</view>
    </view>
  </LayoutContainer>
  <l-confetti
    class="canvas"
    ref="confettiRef"
    @done="fireworkFinish"></l-confetti>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import useFirework from './useFirework';
import { getRecordList, setRecords } from '@/api/dailySign';
import { isForenoon } from '@/utils/isForenoon';

/* 打卡逻辑 structure
'2024-03-31':['11:41:21':'17:30:32']
*/
const doSign = async () => {
  if (notNeedSign.value) return;
  const forenoon = isForenoon();
  await setRecords(new Date().getTime());
  forenoon ? (isForenoonSigned.value = true) : (isAfternoonSigned.value = true);
};

const { createFirework, fireworkFinish, confettiRef, toggle } =
  useFirework(doSign);
const sign = () => {
  if (!toggle.value || notNeedSign.value) return;
  toggle.value = false;
  createFirework();
};

const currentTime = ref<Date>(new Date()); // 当前时间
const isForenoonSigned = ref<Boolean>(false); // 上午是否打卡了
const isAfternoonSigned = ref<Boolean>(false); // 下午是否打卡了

// 上午打完上班卡，下午打完下班卡
const notNeedSign = computed(() => {
  const forenoon = isForenoon();
  return (
    (forenoon && isForenoonSigned.value) ||
    (!forenoon && isAfternoonSigned.value)
  );
});
const time = computed(() => dayjs(currentTime.value).format('HH:mm:ss'));
const signButtonTitle = computed(() => {
  const forenoon = isForenoon();
  if (isForenoonSigned.value && isAfternoonSigned.value) return '今日已打卡';
  if (forenoon && !isForenoonSigned.value) return '上班打卡';
  else if (!forenoon && !isAfternoonSigned.value) return '下班打卡';
  else if (forenoon && isForenoonSigned.value) {
    return '上班已打卡';
  }
  return '今日结束啦~';
});

setInterval(() => (currentTime.value = new Date()), 500);

// 跳转打卡记录
const jumpToRecord = () => {
  if (!toggle.value) return;
  uni.navigateTo({ url: '/pages/record/index' });
};

const initState = async () => {
  // clearBeforeMonthCache();
  const today = dayjs(currentTime.value).format('YYYY-MM-DD');
  const recordList = (await getRecordList(today.slice(0, 7))) || [];
  // 今天的打卡详情
  const todayRecord = recordList.find(record => record.date === today);
  isForenoonSigned.value = !!todayRecord?.clock_in;
  isAfternoonSigned.value = !!todayRecord?.clock_out;
};

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
.canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 5;
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
    box-shadow: 0 4rpx 15rpx 0 rgb(136, 22, 236);
    position: relative;
    .title {
      font-size: 38rpx;
      margin-bottom: 20rpx;
    }
    &.disabled::after {
      content: '';
      position: absolute;
      left: -15rpx;
      right: -15rpx;
      top: -15rpx;
      bottom: -15rpx;
      background: rgba(255, 255, 255, 0.6);
    }
  }

  .record-button {
    text-align: center;
    color: rgb(111, 12, 250);
    margin-top: 40rpx;
  }
}
</style>
