import { Instagram } from "lucide-react";
import snapchatQR from "@/assets/snapchat-qr-code.png";

export const FollowUsSection = () => {
  return (
    <section className="py-16 px-4 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Stay Connected With Salon 803
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Follow us on social media for new styles, promotions, and salon updates!
        </p>
        
        <div className="flex items-center justify-center gap-8 mb-8">
          <a 
            href="https://instagram.com/Salon803Houston" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-smooth hover-scale"
            aria-label="Follow Salon 803 on Instagram"
          >
            <Instagram size={40} />
          </a>
          <a 
            href="https://www.facebook.com/p/Salon803Houston-61578972822900/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-smooth hover-scale"
            aria-label="Follow Salon 803 on Facebook"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
      </div>
    </section>
  );
};
