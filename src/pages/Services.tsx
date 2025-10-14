import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "@/components/ServiceCard";
import { Footer } from "@/components/Footer";
import servicesBg from "@/assets/services-bg.jpg";

const allServices = [
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

const Services = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      <div 
        className="relative min-h-screen py-24 px-4"
        style={{
          backgroundImage: `url(${servicesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div 
          className="absolute inset-0 bg-background/95"
          style={{ backdropFilter: 'blur(2px)' }}
        />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-secondary mb-4 tracking-wider">
              Salon 803
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our complete menu of professional services and pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {allServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                price={service.price}
              />
            ))}
          </div>

          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground italic">
              Prices may vary based on hair length, texture, or additional services.
            </p>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              variant="outline"
              className="shadow-elegant transition-smooth"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Services;
