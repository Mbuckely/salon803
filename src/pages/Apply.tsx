import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

const Apply = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    availability: "",
    socialMedia: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
      const file = fileInput?.files?.[0];

      let resumePath = null;

      // Resume is required
      if (!file) {
        toast.error("Please upload your resume (PDF).");
        setIsSubmitting(false);
        return;
      }

      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      const maxSize = 20 * 1024 * 1024; // 20MB

      if (!isPdf) {
        toast.error("Please upload a PDF file.");
        setIsSubmitting(false);
        return;
      }

      if (file.size > maxSize) {
        toast.error("PDF is too large (max 20MB).");
        setIsSubmitting(false);
        return;
      }

      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("applications")
        .upload(fileName, file);

      if (uploadError) {
        throw new Error(`File upload failed: ${uploadError.message}`);
      }

      resumePath = uploadData.path;

      // Insert application into database
      const { error: insertError } = await supabase.from("applications").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        availability: formData.availability,
        social: formData.socialMedia,
        message: formData.message,
        resume_path: resumePath,
      });

      if (insertError) {
        throw new Error(`Application submission failed: ${insertError.message}`);
      }

      // --- begin email trigger block ---

      // 1) Create a 7-day signed URL for the uploaded resume (if any)
      let resumeUrl = "";
      if (resumePath) {
        try {
          const { data: signed, error: signErr } = await supabase.storage
            .from("applications")
            .createSignedUrl(resumePath, 60 * 60 * 24 * 7);
          if (!signErr && signed?.signedUrl) resumeUrl = signed.signedUrl;
        } catch (e) {
          console.warn("Could not create signed URL for resume:", e);
        }
      }

      // 2) Build payload for the Edge Function (must match template variables)
      const payload = {
        fullName: formData.fullName ?? "Unknown",
        email: formData.email ?? "",
        phone: formData.phone ?? "",
        availability: formData.availability ?? "Not provided",
        social: formData.socialMedia ?? "Not provided",
        resumeUrl,
        message: formData.message ?? "",
      };

      // 3) Call the Edge Function
      const notifyUrl = import.meta.env.VITE_NOTIFY_CONTACT_URL!;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      // Include anon key only if present (for non-public functions)
      if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
        headers["Authorization"] = `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;
      }

      let notifyOk = false;
      try {
        const res = await fetch(notifyUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        notifyOk = !!json?.ok;
        if (!notifyOk) console.error("Notify function returned error:", json);
      } catch (err) {
        console.error("Notify function fetch failed:", err);
      }

      // 4) UX feedback
      if (notifyOk) {
        toast.success("Thank you! We received your application and will be in touch soon.");
      } else {
        toast.error("Application saved, but notification email failed. We'll still review your application.");
      }

      // --- end email trigger block ---

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        availability: "",
        socialMedia: "",
        message: "",
      });

      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("There was an error submitting your application. Please try again.");
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
        <title>Apply - Join Our Team at Salon 803</title>
        <meta
          name="description"
          content="Apply to join the talented team at Salon 803. We're looking for passionate stylists and braiders."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 pt-24 pb-16 px-4 gradient-section">
          <div className="max-w-3xl mx-auto">
            <Button onClick={() => navigate("/")} variant="ghost" className="mb-8">
              ← Back to Home
            </Button>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4 text-center">Join Our Team</h1>
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

              <div>
                <Label htmlFor="resume">Resume (PDF) - Required *</Label>
                <Input id="resume" name="resume" type="file" accept="application/pdf" required aria-required="true" />
              </div>

              {/* Honeypot field - hidden from users */}
              <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Apply;
