import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { MapPin, Phone, Mail } from "lucide-react";

export const ContactSection = () => {
  const handleCall = () => {
    window.location.href = "tel:8326572126";
  };

  const handleEmail = () => {
    window.location.href = "mailto:info@salon803.com";
  };

  const openDirections = () => {
    window.open("https://maps.google.com/?q=4444+Cypress+Creek+Parkway+STE+30+Houston+TX+77068", "_blank");
  };

  return (
    <section id="contact" className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Contact Us" />
        <p className="text-lg text-center text-foreground mb-12 leading-relaxed">
          We'd love to hear from you! Whether you're a new client, returning guest, or future team member, 
          we're here to help.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-card text-center">
            <MapPin className="mx-auto mb-3 text-primary" size={32} />
            <h3 className="font-semibold text-secondary mb-2">Address</h3>
            <p className="text-sm text-foreground">
              4444 Cypress Creek Parkway<br />
              STE 30<br />
              Houston, TX 77068
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-card text-center">
            <Phone className="mx-auto mb-3 text-primary" size={32} />
            <h3 className="font-semibold text-secondary mb-2">Phone</h3>
            <p className="text-sm text-foreground">(832) 657-2126</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-card text-center">
            <Mail className="mx-auto mb-3 text-primary" size={32} />
            <h3 className="font-semibold text-secondary mb-2">Email</h3>
            <p className="text-sm text-foreground">info@salon803.com</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="cta" size="lg" onClick={handleCall}>
            Call Now
          </Button>
          <Button variant="default" size="lg" onClick={handleEmail}>
            Email Us
          </Button>
          <Button variant="secondary" size="lg" onClick={openDirections}>
            Get Directions
          </Button>
        </div>
      </div>
    </section>
  );
};
