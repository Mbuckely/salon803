import { HeroSection } from "@/components/HeroSection";
import { MissionSection } from "@/components/MissionSection";
import { PassionSection } from "@/components/PassionSection";
import { ServicesSection } from "@/components/ServicesSection";
import { LocationSection } from "@/components/LocationSection";
import { JoinTeamSection } from "@/components/JoinTeamSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <PassionSection />
      <ServicesSection />
      <LocationSection />
      <JoinTeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
