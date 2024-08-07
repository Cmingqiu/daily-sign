<template>
  <LayoutContainer>
    <view class="home">
      <view class="result-row">
        <view class="button">
          <text>上班8:30</text>
          <view flex items-center mt-1>
            <u-icon
              v-if="wordOnTime"
              name="checkmark-circle-fill"
              :color="isLate ? 'rgb(255, 128, 64)' : '#8816ec'"
              size="28"></u-icon>
            <text ml-1>{{ wordOnTime ? wordOnTime : '未打卡' }}</text>
          </view>
        </view>
        <view class="button">
          <text>下班17:30</text>

          <view flex items-center mt-1>
            <u-icon
              v-if="wordOffTime"
              name="checkmark-circle-fill"
              color="#8816ec"
              size="28"></u-icon>
            <text ml-1>{{ wordOffTime ? wordOffTime : '未打卡' }}</text>
          </view>
        </view>
      </view>

      <!-- 鼓励语 -->
      <view class="positive-word" mt-5 mb-5 text-center text-40>{{
        positiveWord
      }}</view>

      <view
        :class="['sign-button', (notNeedSign || !toggle) && 'disabled']"
        @click="sign">
        <view class="title">{{ signButtonTitle }} </view>
        <view class="time">{{ time }}</view>
      </view>
      <view class="record-button" @click="cancelOneSubscribe"
        >取消当次订阅</view
      >
      <image
        class="subscribe-button"
        src="@/static/subscribe.gif"
        @click="triggerSubscribe"
        mode="aspectFit" />

      <!-- 位置 -->
      <view mt-5 flex items-center v-show="address">
        <uni-icons mr-2 type="paperplane-filled" color="#8816ec" size="24" />
        {{ address }}
      </view>
    </view>
  </LayoutContainer>
  <l-confetti
    class="canvas"
    ref="confettiRef"
    @done="fireworkFinish"></l-confetti>
</template>

<script setup lang="ts">
import { onShow, onUnload } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { ref, computed, onBeforeUnmount } from 'vue';
import useFirework from './useFirework';
import useLocation from './useLocation';
import { getRecordList, setOrUpdateRecord } from '@/api/dailySign';
import { getLatestHoliday } from '@/api/holiday';
import { cancelOneSubscribeAPI } from '@/api/subscribe';
import { isForenoon } from '@/utils/isForenoon';
import { RECORD_TYPE } from '@/config/enums';
import {
  SIGN_NOTIFY_ID1,
  SIGN_NOTIFY_ID2,
  SIGN_NOTIFY_ID3
} from '@/config/const';

const { address } = useLocation();

// 打卡逻辑
const doSign = async () => {
  await setOrUpdateRecord({ timestamp: new Date().getTime() });
  initState();
};

const { createFirework, fireworkFinish, confettiRef, toggle } = useFirework();
const sign = async () => {
  if (!toggle.value || notNeedSign.value) return;

  // 消息订阅
  triggerSubscribe();

  toggle.value = false;
  await doSign();
  createFirework();
  uni.vibrateShort();
};

const currentTime = ref<Date>(new Date()); // 当前时间
const wordOnTime = ref<string>(''); // 上班打卡时间
const wordOffTime = ref<string>(''); // 下班打卡时间
const positiveWord = ref<string>(''); // 鼓励语

// 上午打完上班卡，下午打完下班卡
const notNeedSign = computed(() => {
  const forenoon = isForenoon();
  return (forenoon && wordOnTime.value) || (!forenoon && wordOffTime.value);
});
const time = computed(() => dayjs(currentTime.value).format('HH:mm:ss'));
// 上午是否迟到
const isLate = computed(() =>
  wordOnTime.value
    ? new Date(
        `${dayjs().format('YYYY/MM/DD')} ${wordOnTime.value}`
      ).getTime() >=
      new Date(`${dayjs().format('YYYY/MM/DD')} 08:31:00`).getTime()
    : false
);
const signButtonTitle = computed(() => {
  const forenoon = isForenoon();
  if (wordOnTime.value && wordOffTime.value) return '今日已打卡';
  if (forenoon && !wordOnTime.value)
    return isLate.value ? '迟到打卡' : '上班打卡';
  else if (!forenoon && !wordOffTime.value) return '下班打卡';
  else if (forenoon && wordOnTime.value) {
    return '上班已打卡';
  }
  return '今日结束啦~';
});

const timer = setInterval(() => (currentTime.value = new Date()), 500);

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
  if (todayRecord) {
    const workOn = todayRecord.detail.findLast(
      ({ record_type }) => record_type === RECORD_TYPE.ON
    );
    const workOff = todayRecord.detail.find(
      ({ record_type }) => record_type === RECORD_TYPE.OFF
    );

    wordOnTime.value = workOn?.timestamp
      ? dayjs(workOn.timestamp).format('HH:mm:ss')
      : '';
    wordOffTime.value = workOff?.timestamp
      ? dayjs(workOff.timestamp).format('HH:mm:ss')
      : '';
  }
};

onShow(() => {
  fetchTTS();
  initState();
});
onBeforeUnmount(() => clearInterval(timer));
onUnload(() => clearInterval(timer));

// 获取鼓励语
async function fetchTTS() {
  try {
    const { code, tts } = await getLatestHoliday();
    if (code === 0) positiveWord.value = tts;
  } catch (error) {}
}

/**
 * 一次性订阅打卡通知
 */
function triggerSubscribe() {
  uni.requestSubscribeMessage({
    tmplIds: [SIGN_NOTIFY_ID1, SIGN_NOTIFY_ID2, SIGN_NOTIFY_ID3],
    success(res) {
      console.log('requestSubscribeMessage success: ', res);
      /*   const status = res[SIGN_NOTIFY_ID as keyof typeof res];
      if (status === 'reject') {
       uni.showModal({
            title: '提示',
            content: '请在设置中开启订阅',
            showCancel: true,
            success: ({ confirm, cancel }) => {
              if (confirm) uni.openSetting({ withSubscriptions: true });
            }
          }); 
      }*/
    },
    fail(err) {
      /* uni.showToast({
        title: err.errMsg,
        icon: 'error',
        mask: true
      }); */
    }
  });
}

/**
 * 取消当次订阅
 */
async function cancelOneSubscribe() {
  await cancelOneSubscribeAPI();
  uni.showToast({ title: '取消成功', icon: 'success' });
}

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
  height: 100%;
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
    margin-top: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $uni-text-color-inverse;
    background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));
    box-shadow: 0 4rpx 15rpx 0 #8816ec;
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

  .subscribe-button {
    position: absolute;
    right: -35rpx;
    bottom: -10rpx;
    width: 200rpx;
    height: 200rpx;
  }
  .record-button {
    text-align: center;
    color: rgb(111, 12, 250);
    margin-top: 80rpx;
  }

  .positive-word {
    background: linear-gradient(to right, red, blue);
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }
}
</style>
