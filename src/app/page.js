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
