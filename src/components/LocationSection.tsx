import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { MapPin } from "lucide-react";

export const LocationSection = () => {
  const openDirections = () => {
    window.open("https://maps.google.com/?q=4444+Cypress+Creek+Parkway+STE+30+Houston+TX+77068", "_blank");
  };

  return (
    <section id="location" className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader title="Our Location" />
        <p className="text-lg text-foreground mb-8 leading-relaxed">
          Visit us in the heart of North Houston! Salon 803 is conveniently located for clients across the area, 
          with a welcoming, modern atmosphere and expert stylists ready to serve you.
        </p>
        
        <div className="bg-card p-8 rounded-lg shadow-elegant mb-8">
          <div className="flex items-start justify-center gap-3 mb-4">
            <MapPin className="text-primary mt-1" size={24} />
            <div className="text-left">
              <p className="font-semibold text-lg text-secondary">Salon 803</p>
              <p className="text-foreground">4444 Cypress Creek Parkway, STE 30</p>
              <p className="text-foreground">Houston, TX 77068</p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="cta" 
          size="lg"
          onClick={openDirections}
        >
          Get Directions
        </Button>
      </div>
    </section>
  );
};
