import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

export const PassionSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="passion" className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Our Passion" />
        <p className="text-lg text-center text-foreground mb-8 leading-relaxed">
          At Salon 803, we love all things beauty. Our passion for the industry has made us a trusted destination 
          for modern hair care, custom styling, and expert service. Whether you're looking for a fresh new look 
          or a classic style, our talented team is here to make you feel confident and beautiful.
        </p>
        <div className="text-center">
          <Button 
            variant="cta" 
            size="lg"
            onClick={() => scrollToSection("services")}
          >
            Explore Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};
