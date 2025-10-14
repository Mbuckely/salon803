import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "./SectionHeader";
import { toast } from "sonner";

export const JoinTeamSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    availability: "",
    socialMedia: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Team Application from ${formData.fullName}`);
    const body = encodeURIComponent(`
Full Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Weekly Availability: ${formData.availability}
Social Media: ${formData.socialMedia}

Message:
${formData.message}
    `);
    
    window.location.href = `mailto:info@salon803.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        
        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-elegant space-y-6">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="availability">Weekly Availability *</Label>
            <Input
              id="availability"
              name="availability"
              required
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g., Mon-Fri 9am-5pm"
            />
          </div>
          
          <div>
            <Label htmlFor="socialMedia">Social Media Handles (optional)</Label>
            <Input
              id="socialMedia"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleChange}
              placeholder="@yourhandle"
            />
          </div>
          
          <div>
            <Label htmlFor="message">Tell us about yourself and why you'd be a great fit! *</Label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your experience, passion, and what makes you unique..."
              rows={5}
            />
          </div>
          
          <Button type="submit" variant="cta" size="lg" className="w-full">
            Apply Now
          </Button>
        </form>
      </div>
    </section>
  );
};
