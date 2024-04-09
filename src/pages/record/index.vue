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

const calendarRef = ref();

const { year, month, date } = getFormatDate(new Date());
const actDay = ref<string[]>([`${year}-${month}-${date}`]); // 单选的日期
const signedDay: string[] = reactive([]);

const detail = computed<Array<string>>(() => {
  const signedValue = uni.getStorageSync(actDay.value[0]);
  return signedValue;
});

const onDayClick = ({ date }: { date: string; week: string }) => {
  if (!actDay.value.includes(date)) actDay.value = [date];
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
