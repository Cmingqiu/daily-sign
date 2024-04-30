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
 * @param year 查询某年节假日 默认当年
 * @param month 查询某月节假日
 */
export function getHolidayInfo(
  year?: string | number,
  month?: string | number
) {
  return http<HolidayTypeResponse>({
    url: `https://timor.tech/api/holiday/year/${
      year !== undefined
        ? `${year}${month !== undefined ? `-${month}` : ''}`
        : ''
    }`
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
