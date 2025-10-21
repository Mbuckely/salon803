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
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Salon 803 | Professional Hair Care & Styling in North Houston</title>
        <meta 
          name="description" 
          content="Welcome to Salon 803, North Houston's go-to destination for quality hair care at affordable prices. Professional sew-ins, wig installs, silk press, braids, and more. Visit us at 4444 Cypress Creek Parkway." 
        />
        <meta 
          name="keywords" 
          content="Salon 803, North Houston hair salon, affordable hair care, sew-in, wig install, silk press, braids, hair styling Houston" 
        />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>
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
    </>
  );
};

export default Index;
