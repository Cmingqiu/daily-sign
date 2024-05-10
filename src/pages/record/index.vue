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
import { onShow } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';
import SignDetail from './SignDetail.vue';
import getFormatDate from '@/utils/getFormatDate';
import { getRecordList, type RecordList } from '@/api/dailySign';
import dayjs from 'dayjs';
import type { ISignDetail } from './hooks/usePicker';

interface CalenderDate {
  year: number;
  month: string | number;
  date: string | number;
  day: number;
  isCurM: boolean;
}

const calendarRef = ref(); // 日历组件

const { year, month, date } = getFormatDate(new Date());
const actDay = ref<string[]>([`${year}-${month}-${date}`]); // 单选的日期
const curMonthRecords = ref<Array<RecordList>>([]); // 当月所有的打卡记录列表

// 正常打卡的日期
const signedDay = computed(() =>
  curMonthRecords.value
    .filter(record => record.clock_in && record.clock_in)
    .map(record => record.date)
);

// 是否显示回到今天按钮
const isShowTodayBtn = computed(() => {
  const { year, month, date: d } = getFormatDate(new Date());
  return actDay.value[0] !== `${year}-${month}-${d}`;
});

// 单选当天的打卡详情
const detail = computed(() => {
  const today = actDay.value[0];
  const todayRecord = curMonthRecords.value.find(
    record => record.date === today
  );
  const details = todayRecord?.detail || [];
  const workIn = details.find(({ record_type }) => record_type === 1);
  const workOut = details.find(({ record_type }) => record_type === 2);
  const result: ISignDetail[] = [];
  workIn?.timestamp &&
    result.push({
      id: workIn.id,
      time: dayjs(workIn?.timestamp).format('HH:mm:ss'),
      work_date: workIn.work_date
    });
  workOut?.timestamp &&
    result.push({
      id: workOut.id,
      time: dayjs(workOut?.timestamp).format('HH:mm:ss'),
      work_date: workOut.work_date
    });

  return result;
});

const onDayClick = ({ date }: { date: string; week: string }) => {
  if (!actDay.value.includes(date)) actDay.value = [date];
};

// 切换月份
const changeMonth = (dates: CalenderDate[]) => {
  const day = dates.find(d => Number(d.date) === 1 && d.isCurM);
  if (day) {
    actDay.value = [`${day.year}-${day.month}-${day.date}`];
    fetchRecordList(`${day.year}-${day.month}`);
  }
};

// 回到今天
const backToday = () => {
  const { year, month, date } = getFormatDate(new Date());
  actDay.value = [`${year}-${month}-${date}`];
  calendarRef.value.changYearMonth(year, month);
  fetchRecordList(`${year}-${month}`);
};

// 从服务端请求一个月中的打卡记录
async function fetchRecordList(day = dayjs().format('YYYY-MM')) {
  curMonthRecords.value = (await getRecordList(day)) || [];
}

onShow(fetchRecordList);
</script>

<style lang="scss" scoped>
.record {
  .item {
  }
}
</style>
