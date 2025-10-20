import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Apply = () => {
  const navigate = useNavigate();
  const captchaRef = useRef<HCaptcha>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    availability: "",
    experience: "",
    consent: false,
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = file.name.toLowerCase().match(/\.\w+$/)?.[0];

    if (!allowedTypes.includes(file.type) && (!fileExtension || !allowedExtensions.includes(fileExtension))) {
      toast.error("Please upload a PDF, DOC, or DOCX file");
      e.target.value = "";
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
      toast.error("File size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all required fields
    if (!formData.name.trim() || formData.name.length > 100) {
      toast.error("Please enter a valid name (max 100 characters)");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) || formData.email.length > 255) {
      toast.error("Please enter a valid email address");
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!formData.position.trim() || formData.position.length > 100) {
      toast.error("Please enter a valid position (max 100 characters)");
      return;
    }

    if (!formData.availability.trim() || formData.availability.length > 200) {
      toast.error("Please enter your availability (max 200 characters)");
      return;
    }

    if (!formData.experience.trim() || formData.experience.length > 1000) {
      toast.error("Please describe your experience (max 1000 characters)");
      return;
    }

    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    if (!formData.consent) {
      toast.error("Please accept the privacy policy");
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert file to base64
      const resumeData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(resumeFile);
      });

      // Get Apps Script webhook URL from environment
      const webhookUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
      
      if (!webhookUrl) {
        throw new Error('Application webhook not configured. Please contact support.');
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
          resumeData,
          resumeName: resumeFile.name,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      toast.success("Application submitted successfully! We'll be in touch soon.");
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        position: "",
        availability: "",
        experience: "",
        consent: false,
      });
      setResumeFile(null);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      // Navigate to confirmation page after 2 seconds
      setTimeout(() => navigate("/"), 2000);

    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Apply - Join Our Team at Salon 803 | Professional Hair Salon Careers</title>
        <meta
          name="description"
          content="Apply to join the talented team at Salon 803 in North Houston. We're looking for passionate stylists and braiders. Submit your application today."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${window.location.origin}/apply`} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 pt-24 pb-16 px-4 gradient-section">
          <div className="max-w-3xl mx-auto">
            <Button onClick={() => navigate("/")} variant="ghost" className="mb-8">
              ← Back to Home
            </Button>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4 text-center">
              Join Our Team
            </h1>
            <p className="text-lg text-center text-foreground mb-8 leading-relaxed">
              Are you a passionate stylist or braider looking for a fresh start in a supportive and professional salon?
              Salon 803 is growing — and we're looking for talented individuals to join our team.
            </p>

            <div className="bg-primary-light p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-4">What We Offer:</h2>
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
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  maxLength={100}
                  aria-required="true"
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
                  aria-required="true"
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
                  maxLength={255}
                  aria-required="true"
                />
              </div>

              <div>
                <Label htmlFor="position">Position Applying For *</Label>
                <Input
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g., Hair Stylist, Braider"
                  maxLength={100}
                  aria-required="true"
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
                  maxLength={200}
                  aria-required="true"
                />
              </div>

              <div>
                <Label htmlFor="experience">Tell us about your experience and why you'd be a great fit *</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Share your experience, passion, and what makes you unique..."
                  rows={5}
                  maxLength={1000}
                  aria-required="true"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.experience.length}/1000 characters
                </p>
              </div>

              <div>
                <Label htmlFor="resume">Resume (PDF, DOC, or DOCX - Max 5MB) *</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  onChange={handleFileChange}
                  aria-required="true"
                />
                {resumeFile && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, consent: checked as boolean })
                  }
                  aria-required="true"
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                  I consent to the collection and processing of my personal information as described in the{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  . *
                </Label>
              </div>

              <div className="flex justify-center">
                <HCaptcha
                  ref={captchaRef}
                  sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
                  onVerify={handleCaptchaVerify}
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90"
                disabled={isSubmitting || !captchaToken}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to our data handling practices. We will never share your
                information with third parties without your explicit consent.
              </p>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Apply;
