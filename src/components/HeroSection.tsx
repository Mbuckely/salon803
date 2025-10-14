import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube } from "lucide-react";
import heroImage from "@/assets/salon-hero.jpg";

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 gradient-hero" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          Award-Winning Hair Care in North Houston
        </h1>
        <p className="text-xl md:text-2xl text-white mb-10 drop-shadow-lg font-light">
          Flawless styles and full-service hair care — without the hassle or high cost.
        </p>
        
        <Button 
          variant="cta" 
          size="lg"
          onClick={() => scrollToSection("mission")}
          className="mb-8"
        >
          Start Your Journey
        </Button>
        
        <div className="flex items-center justify-center gap-6">
          <a 
            href="https://instagram.com/Salon803Houston" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-smooth"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={32} />
          </a>
          <a 
            href="#" 
            className="text-white hover:text-accent transition-smooth"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={32} />
          </a>
          <a 
            href="#" 
            className="text-white hover:text-accent transition-smooth"
            aria-label="Follow us on TikTok"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          </a>
          <a 
            href="#" 
            className="text-white hover:text-accent transition-smooth"
            aria-label="Subscribe on YouTube"
          >
            <Youtube size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};
