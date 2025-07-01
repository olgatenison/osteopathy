import { format } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Форматирует дату с локалью и делает первую букву месяца заглавной
 * @param {Date} date - Дата, которую нужно отформатировать
 * @param {string} pattern - Шаблон форматирования (например, "LLLL yyyy", "dd MMMM yyyy")
 * @returns {string} - Строка с заглавной буквой месяца
 */
export function capitalizeDate(date, pattern = "dd MMMM yyyy") {
  const formatted = format(date, pattern, { locale: ru });

  // Заменяет первую букву месяца на заглавную
  return formatted.replace(
    /(\d{2} )?([а-яё])/i,
    (_, d = "", l) => `${d}${l.toUpperCase()}`
  );
}
