import { ServiceCard } from "./ServiceCard";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const featuredServices = [
  { title: "Traditional Sew-In", description: "Classic protective style with natural-looking results", price: "$75" },
  { title: "Closure Wig Install", description: "Professional wig installation with closure", price: "$135" },
  { title: "Silk Press", description: "Smooth, silky straight styling", price: "$35" },
  { title: "Blow Out", description: "Professional blow dry and styling", price: "$45" },
];

export const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-24 px-4 gradient-section">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Featured Services" 
          subtitle="Our most popular services"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              price={service.price}
            />
          ))}
        </div>
        <div className="text-center">
          <Button 
            onClick={() => {
              console.log('Navigating to /services');
              navigate('/services');
            }}
            size="lg"
            variant="cta"
            className="shadow-elegant transition-smooth"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};
