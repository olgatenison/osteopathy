import Image from "next/image";
import Hero from "../components/Hero";
import Infografic from "../components/Infografic";
import About from "../components/About";
import Screenshot from "../components/Screenshot";
import Methods from "../components/Methods";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";
import Help from "../components/Help";
import GetInTouch from "../components/GetInTouch";
import Button from "../components/Button";
import Cookie from "@/components/Cookie";
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
        url: `https://www.osteobodyhacking.ee/og-image.jpg`,
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
export default function Home() {
  return (
    <>
      {" "}
      <Button />
      <Hero />
      <Infografic />
      <Help />
      <About />
      <Screenshot />
      <Methods />
      <GetInTouch />
      <Contacts />
      <Footer />
      <Cookie />
    </>
  );
}
