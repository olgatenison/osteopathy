import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMontserrat = Montserrat({
  variable: "--font-geist-montserrat",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Остеопатия в Таллине | Руслан Гулишевский",
  description:
    "Запишитесь на прием к остеопату Руслану Гулишевскому в Таллине для профилактики заболеваний опорно-двигательного аппарата.",
  keywords:
    "остеопатия, здоровье, Таллин, Руслан Гулишевский, остеопат, массаж, реабилитация",
  author: "Ольга Тенисон",
  openGraph: {
    title: "Остеопатия в Таллине | Руслан Гулишевский",
    description:
      "Запишитесь на прием к остеопату Руслану Гулишевскому в Таллине для лечения и профилактики заболеваний опорно-двигательного аппарата.",
    url: "https://osteobodyhacking.com/",
    siteName: "Остеопатия в Таллине",
    images: ["publicosteopathy-tallinn-ruslan-gulishchevsky.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistMontserrat.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
