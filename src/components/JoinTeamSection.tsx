import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { Link } from "react-router-dom";

export const JoinTeamSection = () => {
  return (
    <section id="join-team" className="py-24 px-4 gradient-section">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Join Our Team" />
        <p className="text-lg text-center text-foreground mb-8 leading-relaxed">
          Are you a passionate stylist or braider looking for a fresh start in a supportive and professional salon? 
          Salon 803 is growing — and we're looking for talented individuals to join our team.
        </p>
        
        <div className="bg-primary-light p-8 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-secondary mb-4">What We Offer:</h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Flexible schedule options</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>High-traffic location to build your clientele</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Positive, professional atmosphere</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Marketing support + social media features</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Product discounts & networking opportunities</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="cta" className="shadow-elegant transition-smooth">
            <Link to="/apply">Apply Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
