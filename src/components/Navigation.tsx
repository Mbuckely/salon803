import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = location.pathname === "/";

  const scrollToSection = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Home", action: () => navigate("/") },
    { label: "Mission", action: () => scrollToSection("mission") },
    { label: "Services", action: () => navigate("/services") },
    { label: "Location", action: () => scrollToSection("location") },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-heading font-bold text-secondary hover:text-primary transition-smooth"
          >
            Salon 803
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                onClick={link.action}
                className="text-foreground hover:text-primary"
              >
                {link.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  onClick={link.action}
                  className="w-full justify-start text-foreground hover:text-primary"
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
