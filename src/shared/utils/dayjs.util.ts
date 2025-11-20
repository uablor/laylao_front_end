import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Date | string) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export function calculateDays(
  startDate?: string | Date | Dayjs | null,
  endDate?: string | Date | Dayjs | null
): number {
  if (!startDate || !endDate) return 0;
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const diff = end.diff(start, "day");
  return diff > 0 ? diff : 0;
}