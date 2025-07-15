import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const { data: slots, error } = await supabase
    .from("slots")
    .select("id, start, client_id, clients (email, first_name)")
    .eq("booked", true)
    .eq("reminder_sent", false)
    .gte("start", now.toISOString())
    .lte("start", in24h.toISOString());

  if (error) {
    console.error("❌ Помилка пошуку слотів:", error);
    return NextResponse.json(
      { error: "Помилка пошуку слотів" },
      { status: 500 }
    );
  }

  for (const slot of slots) {
    const { email, first_name } = slot.clients;

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

    // відзначаємо як відправлене
    await supabase
      .from("slots")
      .update({ reminder_sent: true })
      .eq("id", slot.id);
  }

  return NextResponse.json({ message: "Нагадування надіслані" });
}
