import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "@/components/ServiceCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Helmet } from "react-helmet";
const watermarkUrl = "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/529681385_122103455774965760_3529433213906757931_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=M_-Hy5uEkKUQ7kNvwHFlFyF&_nc_oc=AdkqpS_34-Hqk9Aw_1W8MJuCl9P2fmFOioXRharFpRrNk1FZuZZfdyvbNxjlZpgdfQCQeH3RHGhvZw4W7r_gQnLo&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=lfA6x4pCNXAHosKhH5w9WQ&oh=00_AfeFlccxvERvoynouI67j9NwkZzCM0xVbQKk5yShvpEAFw&oe=68F4B5AF";

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
      <Helmet>
        <title>Salon 803 — Full Service Menu & Pricing | North Houston</title>
        <meta 
          name="description" 
          content="Explore Salon 803's full service menu including sew-ins, wig installs, silk press, braids, and more — all at affordable prices." 
        />
        <meta 
          name="keywords" 
          content="Salon 803 services, Houston hair salon, sew-in prices, wig install, silk press, braids" 
        />
      </Helmet>
      <Navigation />
      <div 
        className="relative min-h-screen py-24 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src={watermarkUrl}
            alt="Salon 803 watermark"
            className="opacity-10 max-w-[70%] max-h-[70%] object-contain"
            aria-hidden="true"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-secondary mb-4 tracking-wider">
              Salon 803 — Full Service Menu & Pricing
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {allServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                price={service.price}
                aria-label={`${service.title} — ${service.price}`}
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
