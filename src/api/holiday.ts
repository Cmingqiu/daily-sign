import http from '.';

export interface HolidayType {
  holiday: boolean;
  name: string;
  wage: number;
  date: string;
  rest: number;
}
interface HolidayMapType {
  [key: string]: HolidayType;
}
interface HolidayTypeResponse {
  code: number;
  holiday: HolidayMapType;
}

/**
 * 查询当年当月的节假日
 */
export function getMonthHoliday(year: string | number, month: string | number) {
  return http<HolidayTypeResponse>({
    url: `https://timor.tech/api/holiday/year/${year}-${month}`
  });
}

/**
 * 查询距离今天最近的一个放假安排。周六周末、调休、节假日都会考虑，比较全面的放假安排
 */
export function getLatestHoliday() {
  return http<{ code: number; tts: string }>({
    url: `https://timor.tech/api/holiday/tts`
  });
}
