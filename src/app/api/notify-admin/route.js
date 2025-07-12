import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const runtime = "nodejs";
import nodemailer from "nodemailer";

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
      appointmentDate,
      selectedSlot,
      message,
    } = body;

    if (!clientName || !clientEmail || !appointmentDate || !selectedSlot) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const formattedDate = format(
      new Date(appointmentDate),
      "d MMMM yyyy, HH:mm",
      { locale: ru }
    );

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
    `;

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
    `;

    // 📧 Отправляем админу
    await transporter.sendMail({
      from: `"Остеопатия" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Новая запись с сайта",
      text: adminText,
    });

    // 📧 Отправляем клиенту
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
      JSON.stringify({ message: "Failed to send emails", error }),
      { status: 500 }
    );
  }
}
