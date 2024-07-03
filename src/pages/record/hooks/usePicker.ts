import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { isForenoon } from '@/utils/isForenoon';
import { setOrUpdateRecord, type RecordParams } from '@/api/dailySign';

export interface IRecodeDetail {
  detail: Array<ISignDetail | null>;
  actDay: string[];
}

export interface ISignDetail {
  id: number;
  time: string;
  work_date: string;
}

export default function (props: IRecodeDetail, emits: (e: 'update') => void) {
  const uPickerRef = ref();
  const showPicker = ref(false); // 更新时间选择器的显隐

  // 小时和分钟选择列
  const hours = new Array(24).fill(0).map((v, index) => index);
  const minutes = new Array(60).fill(0).map((v, index) => index);
  const seconds = new Array(60).fill(0).map((v, index) => index);
  const firstColumns = ['上班', '下班'];
  const pickerColumns = computed(() => [
    firstColumns.slice(0, props.detail.length),
    hours,
    minutes,
    seconds
  ]);

  const defaultPickerIndex = ref(setDefaultPickerIndex());
  // 每次打开设置默认值
  watch(showPicker, show => {
    show && (defaultPickerIndex.value = setDefaultPickerIndex());
  });

  function setDefaultPickerIndex() {
    let [nowHour, nowMinute, nowSecond] = dayjs().format('HH:mm:ss').split(':');
    const firstColumnValue = isForenoon() ? 0 : 1;
    const detail = props.detail[firstColumnValue];
    if (detail) {
      const [h, m, s] = detail.time.split(':');
      nowHour = h;
      nowMinute = m;
      nowSecond = s;
    }
    return [firstColumnValue, +nowHour, +nowMinute, +nowSecond];
  }

  const pickerConfirm = async ({
    indexs: [idx, h, m, s]
  }: {
    indexs: any[];
  }) => {
    const isUpdateTime = props.detail[idx] !== undefined;
    const timestamp = dayjs(
      `${props.actDay[0].replaceAll('-', '/')} ${h}:${m}:${s}`
    ).valueOf();
    console.log('日期组件选择的值： ', idx, h, m, s);
    const params: RecordParams = { timestamp };
    // 更新打卡时间
    if (isUpdateTime) {
      const { id } = props.detail[idx]!;
      params.id = id;
    }
    try {
      await setOrUpdateRecord(params);
      uni.showToast({ title: '更新成功', icon: 'success' });
      showPicker.value = false;
      emits('update');
    } catch (error) {
      uni.showToast({ title: '更新失败', icon: 'error' });
    }
  };

  return {
    uPickerRef,
    defaultPickerIndex,
    showPicker,
    pickerColumns,
    pickerConfirm
  };
}
