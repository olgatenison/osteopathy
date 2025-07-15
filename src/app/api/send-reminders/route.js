import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const now = new Date();

  // Знаходимо початок і кінець завтрашнього дня
  const tomorrowStart = new Date();
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setHours(23, 59, 59, 999);

  console.log(
    `📅 Перевіряємо слоти між ${tomorrowStart.toISOString()} і ${tomorrowEnd.toISOString()}`
  );

  // Отримуємо всі заброньовані слоти на завтра
  const { data: slots, error } = await supabase
    .from("slots")
    .select("id, start, client_id, clients (email, first_name)")
    .eq("booked", true)
    .eq("reminder_sent", false)
    .gte("start", tomorrowStart.toISOString())
    .lte("start", tomorrowEnd.toISOString());

  if (error) {
    console.error("❌ Помилка пошуку слотів:", error);
    return NextResponse.json(
      { error: "Помилка пошуку слотів" },
      { status: 500 }
    );
  }

  if (!slots || slots.length === 0) {
    console.log("ℹ️ Немає слотів для нагадування");
    return NextResponse.json({ message: "Немає нагадувань" }, { status: 200 });
  }

  for (const slot of slots) {
    const { email, first_name } = slot.clients;

    try {
      console.log(`📧 Надсилаємо нагадування для: ${email}`);

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

      // Позначаємо слот як нагаданий
      await supabase
        .from("slots")
        .update({ reminder_sent: true })
        .eq("id", slot.id);

      console.log(`✅ Нагадування надіслано клієнту ${email}`);
    } catch (sendError) {
      console.error(
        `❌ Помилка відправки нагадування для ${email}:`,
        sendError
      );
    }
  }

  return NextResponse.json({ message: "Нагадування надіслані" });
}
