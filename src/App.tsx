import BookingCta from "./components/BookingCta.tsx";
import Faq from "./components/Faq.tsx";
import Facts from "./components/Facts.tsx";
import Footer from "./components/Footer.tsx";
import Gallery from "./components/Gallery.tsx";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import Location from "./components/Location.tsx";
import Services from "./components/Services.tsx";
import Team from "./components/Team.tsx";
import { useScrollReveal } from "./lib/reveal.ts";

export default function App() {
  useScrollReveal();
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Facts />
        <Services />
        <Gallery />
        <Team />
        <BookingCta />
        <Faq />
        <Location />
      </main>
      <Footer />
    </>
  );
}
