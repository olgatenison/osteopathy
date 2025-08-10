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
const baseUrl = "https://www.osteobodyhacking.ee";

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
    url: "https://www.osteobodyhacking.ee",
    siteName: "Остеопатия в Таллине",

    images: [
      {
        url: `${baseUrl}/osteopathy-tallinn-ruslan-gulishchevsky.jpg`,
        width: 1200,
        height: 630,
        alt: "Остеопатия в Таллине | Руслан Гулишевский",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
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
