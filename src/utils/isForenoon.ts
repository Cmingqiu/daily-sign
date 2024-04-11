import dayjs from 'dayjs';

// 判断传入时间是上班[0,12)还是下班[12,24)
export function isForenoon(time: number = new Date().getTime()) {
  const hour = dayjs(time).hour();
  return 0 <= hour && hour < 12;
}
