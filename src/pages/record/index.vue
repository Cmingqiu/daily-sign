<template>
  <LayoutContainer>
    <view class="record" relative>
      <zeng-calen
        ref="calendarRef"
        :actDay="actDay"
        :signedDay="signedDay"
        showNotSign
        @onDayClick="onDayClick"
        @changeMonth="changeMonth" />
      <view
        v-show="isShowTodayBtn"
        class="text-[#8816ec]"
        absolute
        top-20
        right-0
        text-sm
        @tap="backToday"
        >回到今天</view
      >
      <SignDetail :detail="detail" />
    </view>
  </LayoutContainer>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import SignDetail from './SignDetail.vue';
import getFormatDate from '@/utils/getFormatDate';

interface CalenderDate {
  year: number;
  month: string | number;
  date: string | number;
  day: number;
  isCurM: boolean;
}

const calendarRef = ref(); // 日历组件
const isShowTodayBtn = ref(false); // 是否显示回到今天按钮

const { year, month, date } = getFormatDate(new Date());
const actDay = ref<string[]>([`${year}-${month}-${date}`]); // 单选的日期
const signedDay: string[] = reactive([]); // 正常打卡的日期

// 单选当天的打卡详情
const detail = computed<Array<string>>(() => {
  const signedValue = uni.getStorageSync(actDay.value[0]);
  return signedValue;
});

const onDayClick = ({ date }: { date: string; week: string }) => {
  const { year, month, date: d } = getFormatDate(new Date());
  if (!actDay.value.includes(date)) actDay.value = [date];
  isShowTodayBtn.value = date !== `${year}-${month}-${d}`;
};

const changeMonth = (dates: CalenderDate[]) => {
  const day = dates.find(d => Number(d.date) === 1 && d.isCurM);
  if (day) actDay.value = [`${day.year}-${day.month}-${day.date}`];
};

const backToday = () => {
  const { year, month, date } = getFormatDate(new Date());
  actDay.value = [`${year}-${month}-${date}`];
  calendarRef.value.changYearMonth(year, month);
};

onMounted(() => {
  const signedCacheKeys = uni.getStorageInfoSync().keys;
  signedCacheKeys.forEach(key => {
    if (/(\d+)-(\d+)-(\d+)/.test(key)) {
      // 判断key是日期
      const list = uni.getStorageSync(key);
      if (list[0] && list[1]) {
        signedDay.push(key);
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.record {
  .item {
  }
}
</style>
