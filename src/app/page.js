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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Остеопатия в Таллине | Руслан Гулишевский",
  description:
    "Прием остеопата Руслана Гулишевского в Таллине для профилактики и поддержки здоровья опорно-двигательного аппарата.",
  url: "https://www.osteobodyhacking.ee",
  image: "https://www.osteobodyhacking.ee/og-image.jpg",
  logo: "https://www.osteobodyhacking.ee/og-image.jpg",
  telephone: "+372 5724 5897",
  email: "hulishevskyi@gmail.com",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Peterburi tee 2f",
    addressLocality: "Tallinn",
    postalCode: "11415",
    addressCountry: "EE",
  },
  areaServed: {
    "@type": "City",
    name: "Tallinn",
  },
  sameAs: [
    "https://www.facebook.com/ruslan.hulisevskyi",
    "https://www.instagram.com/hulisevskyi/",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

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
