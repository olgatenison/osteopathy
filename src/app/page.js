import Image from "next/image";
import Hero from "./components/Hero";
import Infografic from "./components/Infografic";
import About from "./components/About";
import Screenshot from "./components/Screenshot";
import Methods from "./components/Methods";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Infografic />
      <About />
      <Screenshot />
      <Methods />

      <Contacts />
      <Footer />
    </>
  );
}
