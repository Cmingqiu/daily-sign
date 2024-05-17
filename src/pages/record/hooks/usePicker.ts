import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { isForenoon } from '@/utils/isForenoon';
import { updateRecords } from '@/api/dailySign';

export interface IRecodeDetail {
  detail: Array<ISignDetail | null>;
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
    const [nowHour, nowMinute, nowSecond] = dayjs()
      .format('HH:mm:ss')
      .split(':');
    return [
      isForenoon() ? 0 : props.detail.length - 1,
      +nowHour,
      +nowMinute,
      +nowSecond
    ];
  }

  const pickerConfirm = async ({
    indexs: [idx, h, m, s]
  }: {
    indexs: any[];
  }) => {
    let { id, work_date } = props.detail[idx]!;
    const timestamp = dayjs(`${work_date} ${h}:${m}:${s}`).valueOf();
    console.log('日期组件选择的值： ', idx, h, m, s);
    await updateRecords(id, timestamp);
    showPicker.value = false;
    uni.showToast({ title: '更新成功', icon: 'success' });
    emits('update');
  };

  return {
    uPickerRef,
    defaultPickerIndex,
    showPicker,
    pickerColumns,
    pickerConfirm
  };
}
