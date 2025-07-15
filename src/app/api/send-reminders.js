// pages/api/send-reminders.js
import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // 1️⃣ Знаходимо слоти через 24 години
  const { data: slots, error } = await supabase
    .from("slots")
    .select("id, start, client_id, clients (email, first_name)")
    .eq("booked", true)
    .eq("reminder_sent", false)
    .gte("start", now.toISOString())
    .lte("start", in24h.toISOString());

  if (error) {
    console.error("❌ Помилка пошуку слотів:", error);
    return res.status(500).json({ error: "Помилка пошуку слотів" });
  }

  for (const slot of slots) {
    const { email, first_name } = slot.clients;

    // 2️⃣ Надсилаємо лист
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Нагадування про запис",
        text: `Привіт, ${first_name}! Нагадуємо, що у вас запис на ${new Date(
          slot.start
        ).toLocaleString()}`,
      }),
    });

    // 3️⃣ Позначаємо як надіслано
    await supabase
      .from("slots")
      .update({ reminder_sent: true })
      .eq("id", slot.id);
  }

  res.status(200).json({ message: "Нагадування надіслані" });
}
