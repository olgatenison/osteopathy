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
  metadataBase: new URL("https://www.osteobodyhacking.ee"),

  title: "Остеопатия в Таллине | Руслан Гулишевский",

  description:
    "Запишитесь на прием к остеопату Руслану Гулишевскому в Таллине для профилактики заболеваний опорно-двигательного аппарата.",

  keywords:
    "остеопатия, здоровье, Таллин, Руслан Гулишевский, остеопат, массаж, реабилитация",

  authors: [{ name: "Ольга Тенисон" }],
  creator: "Ольга Тенисон",
  publisher: "Остеопатия в Таллине",
  applicationName: "Остеопатия в Таллине",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Остеопатия в Таллине | Руслан Гулишевский",
    description:
      "Запишитесь на прием к остеопату Руслану Гулишевскому в Таллине для лечения и профилактики заболеваний опорно-двигательного аппарата.",
    url: "/",
    siteName: "Остеопатия в Таллине",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Остеопатия в Таллине | Руслан Гулишевский",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Остеопатия в Таллине | Руслан Гулишевский",
    description:
      "Запишитесь на прием к остеопату Руслану Гулишевскому в Таллине для профилактики заболеваний опорно-двигательного аппарата.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${geistMontserrat.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
