import { Instagram, Facebook, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
          <h3 className="text-2xl font-bold">Salon 803</h3>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://instagram.com/Salon803Houston" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-smooth"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="#" 
              className="hover:text-accent transition-smooth"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="#" 
              className="hover:text-accent transition-smooth"
              aria-label="Follow us on TikTok"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="hover:text-accent transition-smooth"
              aria-label="Subscribe on YouTube"
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>
        
        <div className="text-center text-sm border-t border-secondary-foreground/20 pt-8">
          <p>&copy; {new Date().getFullYear()} Salon 803. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
