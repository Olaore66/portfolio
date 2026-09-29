import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";
import { aboutPage, profile } from "@/data/portfolio";

export const metadata = {
  title: `About | ${profile.name}`,
  description: aboutPage.intro,
};

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
