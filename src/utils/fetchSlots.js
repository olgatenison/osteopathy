// utils/fetchSlots.js
import { supabase } from "../supabase/client";

export async function fetchSlots() {
  const { data, error } = await supabase
    .from("slots")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Ошибка при загрузке слотов:", error);
    return {};
  }

  // группируем по дате
  const grouped = {};
  data.forEach((slot) => {
    const date = slot.date;
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(slot);
  });

  return grouped;
}
