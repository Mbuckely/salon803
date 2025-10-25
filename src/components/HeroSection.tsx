import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
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
          Professional Hair Care & Styling in North Houston
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
            aria-label="Follow Salon 803 on Instagram"
          >
            <Instagram size={32} />
          </a>
          <a 
            href="https://www.snapchat.com/add/Salon803Houston" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-smooth"
            aria-label="Follow Salon 803 on Snapchat"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.166 3c.796 0 3.495.223 4.769 3.073.426.959.324 2.589.24 3.898l-.002.047c-.011.146-.018.278-.024.415.372.122.726.265 1.064.425a1.946 1.946 0 0 1 .686.552c.185.24.239.54.127.827-.17.435-.84.704-1.314.914l-.013.005c-.504.224-1.061.474-1.135.706-.05.157.01.427.11.803.123.458.294 1.087.294 1.835 0 .722-.263 1.322-.783 1.785-.592.528-1.454.796-2.564.796-1.02 0-1.776-.186-2.446-.428-.535-.194-1.002-.363-1.544-.363-.542 0-1.009.169-1.543.363-.67.242-1.427.428-2.447.428-1.11 0-1.972-.268-2.564-.796-.52-.463-.783-1.063-.783-1.785 0-.748.171-1.377.294-1.835.1-.376.16-.646.11-.803-.074-.232-.631-.482-1.135-.706l-.013-.005c-.474-.21-1.144-.479-1.314-.914a.899.899 0 0 1 .127-.827c.162-.21.396-.399.686-.552.338-.16.692-.303 1.064-.425-.006-.137-.013-.27-.024-.415l-.002-.047c-.084-1.309-.186-2.939.24-3.898C8.671 3.223 11.37 3 12.166 3z"/>
            </svg>
          </a>
          <a 
            href="https://www.facebook.com/p/Salon803Houston-61578972822900/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-smooth"
            aria-label="Follow Salon 803 on Facebook"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
