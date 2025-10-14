import { ServiceCard } from "./ServiceCard";
import { SectionHeader } from "./SectionHeader";

const services = [
  { title: "Traditional Sew-In", description: "Classic protective style with natural-looking results", price: "$75" },
  { title: "Versatile Sew-In", description: "Flexible styling options for any occasion", price: "$115" },
  { title: "Closure Sew-In", description: "Seamless closure for a natural finish", price: "$110" },
  { title: "Frontal Sew-In", description: "Hairline perfection with frontal installation", price: "$125" },
  { title: "Closure Wig Install", description: "Professional wig installation with closure", price: "$135" },
  { title: "Frontal Wig Install", description: "Flawless frontal wig application", price: "$145" },
  { title: "Traditional Quick Weave", description: "Fast, beautiful protective styling", price: "$65" },
  { title: "Closure Quick Weave", description: "Quick weave with natural closure", price: "$75" },
  { title: "Frontal Quick Weave", description: "Quick weave with frontal piece", price: "$85" },
  { title: "Hair Wash", description: "Deep cleansing and conditioning treatment", price: "$25" },
  { title: "Circle Braids", description: "Intricate braiding patterns", price: "$15" },
  { title: "Blow Out", description: "Professional blow dry and styling", price: "$45" },
  { title: "Silk Press", description: "Smooth, silky straight styling", price: "$35" },
  { title: "Take Down", description: "Safe and gentle style removal", price: "$15" },
  { title: "Detailed Cut", description: "Precision cutting and shaping", price: "$10" },
  { title: "With Adhesive", description: "Secure adhesive application", price: "$10" },
  { title: "Thick Hair", description: "Additional service for thick hair", price: "$5" },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4 gradient-section">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="You'll Love…" 
          subtitle="Professional services tailored to your beauty needs"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              price={service.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
