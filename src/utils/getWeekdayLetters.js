import { format, addDays, startOfWeek } from "date-fns";
import { ru } from "date-fns/locale";

export function getWeekdayLetters() {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }).map((_, i) =>
    format(addDays(start, i), "EEEEE", { locale: ru })
  );
}
