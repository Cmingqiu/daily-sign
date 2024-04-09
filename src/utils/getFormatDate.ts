import doubleNumber from './doubleNumber';

export default function (d: Date) {
  const today = new Date(d);
  const year = today.getFullYear();
  const month = doubleNumber(today.getMonth() + 1);
  const date = doubleNumber(today.getDate());
  return { year, month, date };
}
