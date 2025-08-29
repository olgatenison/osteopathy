// src/app/api/notify-admin/route.js
import { parse } from "date-fns";
import { ru } from "date-fns/locale";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz"; // ⬅️ добавили tz
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TZ = "Europe/Tallinn";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      clientName,
      clientEmail,
      clientPhone,
      appointmentDate, // может быть "yyyy-MM-dd" или ISO "2025-08-30T10:00:00+03:00/ Z"
      selectedSlot, // { start: "HH:mm", end: "HH:mm" }
      message,
    } = body;

    if (!clientName || !clientEmail || !appointmentDate || !selectedSlot) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // --- СТРОИМ ТОЧНОЕ ВРЕМЯ В ТАЛЛИННЕ ---
    let startUtc;
    if (typeof appointmentDate === "string" && appointmentDate.includes("T")) {
      // Если пришёл ISO (с оффсетом или Z) — этого достаточно
      startUtc = new Date(appointmentDate);
    } else {
      // Если пришла только дата, собираем её с временем слота в локали Таллинна и переводим в UTC
      const startLocal = parse(
        `${appointmentDate} ${selectedSlot.start}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );
      startUtc = fromZonedTime(startLocal, TZ); // было zonedTimeToUtc в старых версиях
    }

    // Форматируем в Europe/Tallinn (день не «съезжает»)
    const formattedDate = formatInTimeZone(startUtc, TZ, "d MMMM yyyy, HH:mm", {
      locale: ru,
    });

    const adminText = `
Новая заявка на приём 📩

👤 Клиент:
Имя: ${clientName}
Email: ${clientEmail}
Телефон: ${clientPhone || "не указан"}

📅 Дата визита: ${formattedDate}
🕒 Время: ${selectedSlot.start} – ${selectedSlot.end}

📌 Сообщение клиента:
${message || "нет"}
    `.trim();

    const clientText = `
Здравствуйте, ${clientName}!

Вы успешно записаны на приём к остеопату.

📅 Дата визита: ${formattedDate}
🕒 Время: ${selectedSlot.start} – ${selectedSlot.end}

📍 Адрес: Peterburi tee 2f, Tallinn, Estonia
📞 Телефон: +372 5724 5897

Если хотите отменить или перенести запись, пожалуйста, свяжитесь с нами заранее.

С уважением,
Руслан Гулишевский
    `.trim();

    // 📧 Админу
    await transporter.sendMail({
      from: `"Остеопатия" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Новая запись с сайта",
      text: adminText,
    });

    // 📧 Клиенту
    await transporter.sendMail({
      from: `"Остеопатия" <${process.env.MAIL_USER}>`,
      to: clientEmail,
      subject: "Подтверждение записи на приём",
      text: clientText,
    });

    return new Response(
      JSON.stringify({ message: "Admin & client notified successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Ошибка отправки писем:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to send emails",
        error: String(error),
      }),
      { status: 500 }
    );
  }
}
