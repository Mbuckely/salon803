import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MissionSection } from "@/components/MissionSection";
import { PassionSection } from "@/components/PassionSection";
import { ServicesSection } from "@/components/ServicesSection";
import { LocationSection } from "@/components/LocationSection";
import { JoinTeamSection } from "@/components/JoinTeamSection";
import { ContactSection } from "@/components/ContactSection";
import { FollowUsSection } from "@/components/FollowUsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <MissionSection />
      <PassionSection />
      <LocationSection />
      <JoinTeamSection />
      <ContactSection />
      <FollowUsSection />
      <Footer />
    </main>
  );
};

export default Index;
