import http from '.';

interface RecordList {
  date: string;
  clock_in: boolean;
  clock_out: boolean;

  detail: Array<RecordDetail>;
}
interface RecordDetail {
  id: string;
  user_id: string;
  work_date: string;
  timestamp: number;
  record_type: number;
}

/**
 * 获取1个月的打卡记录
 * @param yearMonth 例如2024-04
 * @returns Promise<RecordList>
 */
export function getRecordList(yearMonth: string) {
  return http<RecordList>({
    url: `/records/list/123446/${yearMonth}`,
    method: 'GET'
  });
}

interface Record {
  user_id: string;
  timestamp: number;
  record_type: number;
}

/**
 * 设置打卡记录
 * @param data Record
 * @returns
 */
export function setRecords(data: Record) {
  return http({
    url: '/records',
    method: 'POST',
    data
  });
}
