import Image from "next/image";
import Hero from "./components/Hero";
import Infografic from "./components/Infografic";
import About from "./components/About";
import Screenshot from "./components/Screenshot";
import Methods from "./components/Methods";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Help from "./components/Help";

export default function Home() {
  return (
    <>
      <Hero />
      <Infografic />
      <Help />
      <About />
      <Screenshot />
      <Methods />

      <Contacts />
      <Footer />
    </>
  );
}
