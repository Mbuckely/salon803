import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Salon 803</title>
        <meta
          name="description"
          content="Salon 803 privacy policy for job applications. Learn how we collect, use, and protect your personal information."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Button onClick={() => navigate(-1)} variant="ghost" className="mb-8">
              ← Back
            </Button>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Effective Date: January 20, 2025 | Last Updated: January 20, 2025
            </p>

            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-secondary mb-3">Introduction</h2>
                <p className="text-foreground leading-relaxed">
                  Salon 803 ("we," "our," or "us") respects your privacy and is committed to protecting your
                  personal information. This Privacy Policy explains how we collect, use, store, and protect the
                  personal information you provide when applying for a position with us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-secondary mb-3">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Required Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li><strong>Full Name:</strong> To identify your application</li>
                  <li><strong>Email Address:</strong> For communication regarding your application</li>
                  <li><strong>Phone Number:</strong> For interview scheduling and communication</li>
                  <li><strong>Position Applied For:</strong> To match you with appropriate opportunities</li>
                  <li><strong>Availability:</strong> To assess scheduling compatibility</li>
                  <li><strong>Professional Experience:</strong> To evaluate your qualifications</li>
                  <li><strong>Resume:</strong> To review your work history and qualifications</li>
                </ul>

                <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li><strong>IP Address (Hashed):</strong> Used for spam prevention and security monitoring. We do NOT store your actual IP address—only a cryptographic hash that cannot be reversed.</li>
                  <li><strong>Browser Information:</strong> Used for technical troubleshooting and abuse detection.</li>
                  <li><strong>Submission Timestamp:</strong> To track when your application was received.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-secondary mb-3">How We Use Your Information</h2>
                <p className="text-foreground leading-relaxed mb-3">
                  We use your personal information solely for the following purposes:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-foreground">
                  <li><strong>Application Review:</strong> To evaluate your qualifications for employment</li>
                  <li><strong>Communication:</strong> To contact you regarding your application status, interviews, or employment opportunities</li>
                  <li><strong>Compliance:</strong> To maintain records as required by employment law</li>
                  <li><strong>Security:</strong> To prevent spam, fraud, and abuse of our application system</li>
                </ol>

                <div className="bg-primary-light p-4 rounded-lg mt-4">
                  <p className="font-semibold text-secondary mb-2">We will NEVER:</p>
                  <ul className="list-disc pl-6 space-y-1 text-foreground">
                    <li>Sell your personal information to third parties</li>
                    <li>Use your information for marketing purposes without explicit consent</li>
                    <li>Share your information with third parties except as described in this policy</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-secondary mb-3">Data Storage & Security</h2>
                
                <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Where Your Data is Stored</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li><strong>Application Data:</strong> Stored securely in Google Sheets with restricted access</li>
                  <li><strong>Resume Files:</strong> Stored in a private Google Drive folder, not publicly accessible</li>
                  <li><strong>Access Control:</strong> Only authorized Salon 803 personnel can access your information</li>
                </ul>

                <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li>Data transmitted over HTTPS with TLS encryption</li>
                  <li>Service accounts with minimal necessary permissions</li>
                  <li>All data validated to prevent malicious inputs</li>
                  <li>CAPTCHA spam prevention</li>
                  <li>Rate limiting to prevent brute-force attacks</li>
                  <li>Your resume and personal information are never publicly accessible</li>
                </ul>

                <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Data Retention</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li><strong>Active Applications:</strong> Retained for 12 months from submission date</li>
                  <li><strong>Hired Candidates:</strong> Information transferred to employee records per employment law</li>
                  <li><strong>Rejected Applications:</strong> Deleted after 12 months unless you consent to be kept on file</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-secondary mb-3">Your Privacy Rights</h2>
                <p className="text-foreground leading-relaxed mb-3">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li><strong>Right to Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Right to Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Right to Deletion:</strong> Request deletion of your application and data</li>
                  <li><strong>Right to Restriction:</strong> Request limits on how we use your information</li>
                  <li><strong>Right to Portability:</strong> Request your data in a portable format</li>
                  <li><strong>Right to Object:</strong> Object to certain uses of your information</li>
                </ul>

                <div className="bg-card p-6 rounded-lg shadow-card mt-4">
                  <h4 className="font-semibold text-secondary mb-2">How to Exercise Your Rights</h4>
                  <p className="text-foreground mb-2">Contact us to exercise any of these rights:</p>
                  <ul className="space-y-1 text-foreground">
                    <li><strong>Email:</strong> info@salon803.com</li>
                    <li><strong>Phone:</strong> (832) 657-2126</li>
                    <li><strong>Mail:</strong> 4444 Cypress Creek Parkway, STE 30, Houston, TX 77068</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    We will respond to your request within 30 days.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-secondary mb-3">Third-Party Services</h2>
                <p className="text-foreground leading-relaxed mb-3">
                  We use the following third-party services to process your application:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li><strong>Google Workspace:</strong> Secure storage of application data and resumes</li>
                  <li><strong>hCaptcha:</strong> Spam and bot prevention</li>
                  <li><strong>Resend (Optional):</strong> Email notifications to our internal team</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-secondary mb-3">Contact Information</h2>
                <div className="bg-primary-light p-6 rounded-lg">
                  <p className="font-semibold text-secondary mb-2">Salon 803</p>
                  <p className="text-foreground">4444 Cypress Creek Parkway, STE 30</p>
                  <p className="text-foreground">Houston, TX 77068</p>
                  <p className="text-foreground mt-2"><strong>Email:</strong> info@salon803.com</p>
                  <p className="text-foreground"><strong>Phone:</strong> (832) 657-2126</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-secondary mb-3">Changes to This Policy</h2>
                <p className="text-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with
                  an updated "Last Updated" date. If we make material changes, we will notify active applicants
                  via email.
                </p>
              </section>

              <section className="border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  By submitting a job application, you acknowledge that you have read and understood this Privacy
                  Policy and consent to the collection, use, and storage of your information as described.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
