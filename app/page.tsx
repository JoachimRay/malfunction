import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoStrip from "@/components/InfoStrip";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Register from "@/components/Register";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <InfoStrip />
        <About />
        <Schedule />
        <Register />
      </main>
      <Footer />
    </>
  );
}
