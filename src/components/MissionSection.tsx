import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

export const MissionSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="mission" className="py-24 px-4 gradient-section">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Our Mission" />
        <p className="text-lg text-center text-foreground mb-8 leading-relaxed">
          Welcome to Salon 803, North Houston's newest go-to destination for quality hair care at prices you can afford. 
          We're an innovative and up-and-coming salon dedicated to providing flawless styles and full-service hair care 
          without the hassle or high cost.
        </p>
        <div className="text-center">
          <Button 
            variant="cta" 
            size="lg"
            onClick={() => scrollToSection("passion")}
          >
            Our Passion
          </Button>
        </div>
      </div>
    </section>
  );
};
