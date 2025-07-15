import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const now = new Date();

  // Завтра и послезавтра
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date(now);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  // Завтра 10:00
  const tomorrow10AM = new Date(tomorrow);
  tomorrow10AM.setHours(10, 0, 0, 0);

  // Завтра 23:59:59
  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(23, 59, 59, 999);

  // Послезавтра 00:00
  const dayAfterStart = new Date(dayAfterTomorrow);
  dayAfterStart.setHours(0, 0, 0, 0);

  // Послезавтра 09:59:59
  const dayAfter10AM = new Date(dayAfterTomorrow);
  dayAfter10AM.setHours(9, 59, 59, 999);

  console.log(
    `📅 Проверяем слоты:
    1️⃣ Завтра с ${tomorrow10AM.toISOString()} до ${tomorrowEnd.toISOString()}
    2️⃣ Послезавтра с ${dayAfterStart.toISOString()} до ${dayAfter10AM.toISOString()}`
  );

  const { data: slots, error } = await supabase
    .from("slots")
    .select("id, start, client_id, clients (email, first_name)")
    .eq("booked", true)
    .eq("reminder_sent", false)
    .or(
      `and(start.gte.${tomorrow10AM.toISOString()},start.lte.${tomorrowEnd.toISOString()}),and(start.gte.${dayAfterStart.toISOString()},start.lte.${dayAfter10AM.toISOString()})`
    );

  if (error) {
    console.error("❌ Ошибка поиска слотов:", error);
    return NextResponse.json(
      { error: "Ошибка поиска слотов" },
      { status: 500 }
    );
  }

  if (!slots || slots.length === 0) {
    console.log("ℹ️ Нет слотов для напоминаний");
    return NextResponse.json({ message: "Нет напоминаний" }, { status: 200 });
  }

  for (const slot of slots) {
    const { email, first_name } = slot.clients;

    try {
      console.log(`📧 Отправляем напоминание для: ${email}`);

      await fetch(`${process.env.BASE_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Нагадування про запис",
          text: `Привіт, ${first_name}! Нагадуємо, що у вас запис на ${new Date(
            slot.start
          ).toLocaleString()}.`,
        }),
      });

      await supabase
        .from("slots")
        .update({ reminder_sent: true })
        .eq("id", slot.id);

      console.log(`✅ Напоминание отправлено клиенту ${email}`);
    } catch (sendError) {
      console.error(`❌ Ошибка отправки напоминания для ${email}:`, sendError);
    }
  }

  return NextResponse.json({ message: "Напоминания отправлены" });
}
