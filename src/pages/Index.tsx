import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Index = () => {
  useEffect(() => {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear().toString();
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+18326572126";
  };

  const handleEmail = () => {
    window.location.href = "mailto:info@salon803.com";
  };

  const openDirections = () => {
    const q = encodeURIComponent("4444 Cypress Creek Parkway, STE 30, Houston, TX 77068");
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank", "noopener");
  };

  return (
    <>
      <Helmet>
        <title>Salon 803 | Professional Hair Care & Styling in North Houston</title>
        <meta
          name="description"
          content="Salon 803 delivers professional hair care and modern styling in North Houston—quality styles at affordable prices. Book traditional sew-ins, silk press, blow outs and more."
        />
        <link rel="canonical" href="https://salon803.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Salon 803 | Professional Hair Care & Styling in North Houston" />
        <meta
          property="og:description"
          content="Professional hair care and modern styling at fair prices. Sew-ins, silk press, blow outs, wig installs and more."
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/gpt-engineer-file-uploads/lNSXR17kHEfQO3VLkRaOzo1pySM2/uploads/1761006518131-salon803.jpg"
        />
        <meta property="og:image:alt" content="Salon 803 logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Salon 803 | Professional Hair Care & Styling in North Houston" />
        <meta name="twitter:description" content="Professional hair care and modern styling at fair prices." />
        <meta
          name="twitter:image"
          content="https://storage.googleapis.com/gpt-engineer-file-uploads/lNSXR17kHEfQO3VLkRaOzo1pySM2/uploads/1761006518131-salon803.jpg"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            name: "Salon 803",
            image:
              "https://storage.googleapis.com/gpt-engineer-file-uploads/lNSXR17kHEfQO3VLkRaOzo1pySM2/uploads/1761006518131-salon803.jpg",
            address: {
              "@type": "PostalAddress",
              streetAddress: "4444 Cypress Creek Parkway, STE 30",
              addressLocality: "Houston",
              addressRegion: "TX",
              postalCode: "77068",
            },
            telephone: "+1-832-657-2126",
            url: "https://salon803.com/",
          })}
        </script>
      </Helmet>

      <header>
        <section id="hero" className="hero-section" aria-label="Salon 803 hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Professional Hair Care & Styling in North Houston</h1>
            <p className="hero-subtitle">
              Flawless styles and full-service hair care without the hassle or high cost. Delivering quality styles at
              affordable prices.
            </p>
            <button className="btn btn-cta" onClick={() => scrollToSection("mission")}>
              Start Your Journey
            </button>

            <nav className="social-links" aria-label="Salon 803 social links">
              <a
                href="https://instagram.com/Salon803Houston"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.snapchat.com/add/Salon803Houston"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12.166 3c.796 0 3.495.223 4.769 3.073.426.959.324 2.589.24 3.898l-.002.047c-.011.146-.018.278-.024.415.372.122.726.265 1.064.425.27.128.497.31.686.552.185.24.239.54.127.827-.17.435-.84.704-1.314.914-.504.224-1.061.474-1.135.706-.05.157.01.427.11.803.123.458.294 1.087.294 1.835 0 .722-.263 1.322-.783 1.785-.592.528-1.454.796-2.564.796-1.02 0-1.776-.186-2.446-.428-.535-.194-1.002-.363-1.544-.363-.542 0-1.009.169-1.543.363-.67.242-1.427.428-2.447.428-1.11 0-1.972-.268-2.564-.796-.52-.463-.783-1.063-.783-1.785 0-.748.171-1.377.294-1.835.1-.376.16-.646.11-.803-.074-.232-.631-.482-1.135-.706-.474-.21-1.144-.479-1.314-.914a.899.899 0 0 1 .127-.827c.162-.21.396-.399.686-.552.338-.16.692-.303 1.064-.425-.006-.137-.013-.27-.024-.415l-.002-.047c-.084-1.309-.186-2.939.24-3.898C8.671 3.223 11.37 3 12.166 3z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/p/Salon803Houston-61578972822900/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </nav>
          </div>
        </section>
      </header>

      <main id="main">
        <section id="mission" className="section" aria-labelledby="mission-title">
          <div className="container">
            <h2 id="mission-title" className="section-title">
              Our Mission
            </h2>
            <p className="section-text">Welcome to Salon 803.</p>
            <div className="section-cta">
              <button className="btn btn-cta" onClick={() => scrollToSection("passion")}>
                Our Passion
              </button>
            </div>
          </div>
        </section>

        <section id="passion" className="section" aria-labelledby="passion-title">
          <div className="container">
            <h2 id="passion-title" className="section-title">
              Our Passion
            </h2>
            <p className="section-text">
              At Salon 803, we love all things beauty. Our passion for the industry has made us a trusted destination
              for modern hair care, custom styling, and expert service.
            </p>
            <div className="section-cta">
              <button className="btn btn-cta" onClick={() => scrollToSection("services")}>
                Explore Our Services
              </button>
            </div>
          </div>
        </section>

        <section id="services" className="section gradient-section" aria-labelledby="services-title">
          <div className="container-wide">
            <h2 id="services-title" className="section-title">
              Featured Services
            </h2>
            <p className="section-subtitle">Our most popular styles and client favorites</p>

            <div className="services-grid">
              <div className="service-card">
                <h3>Traditional Sew-In</h3>
                <p>Classic protective style with natural-looking results</p>
                <div className="price">$75</div>
              </div>
              <div className="service-card">
                <h3>Closure Wig Install</h3>
                <p>Professional wig installation with closure</p>
                <div className="price">$135</div>
              </div>
              <div className="service-card">
                <h3>Silk Press</h3>
                <p>Smooth, silky straight styling</p>
                <div className="price">$35</div>
              </div>
              <div className="service-card">
                <h3>Blow Out</h3>
                <p>Professional blow dry and styling</p>
                <div className="price">$45</div>
              </div>
            </div>

            <div className="see-more-container" style={{ textAlign: "center", marginTop: "2rem" }}>
              <a
                href="/services.html"
                className="btn btn-primary"
                style={{ padding: "0.75rem 2rem", fontSize: "1.1rem" }}
              >
                View All Services
              </a>
            </div>
          </div>
        </section>

        <section id="location" className="section" aria-labelledby="location-title">
          <div className="container">
            <h2 id="location-title" className="section-title">
              Our Location
            </h2>
            <p className="section-text">
              Visit us in the heart of North Houston! Salon 803 is conveniently located for clients across the area.
            </p>
            <div className="location-card">
              <svg
                className="icon-primary"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="location-name">Salon 803</p>
                <p>4444 Cypress Creek Parkway, STE 30</p>
                <p>Houston, TX 77068</p>
              </div>
            </div>
            <div className="section-cta">
              <button className="btn btn-cta" onClick={openDirections}>
                Get Directions
              </button>
            </div>
          </div>
        </section>

        <section id="join-team" className="section gradient-section" aria-labelledby="join-title">
          <div className="container">
            <h2 id="join-title" className="section-title">
              Join Our Team
            </h2>
            <p className="section-text">
              Are you a passionate stylist or braider looking for a fresh start in a supportive and professional salon?
              We're growing come join us.
            </p>

            <div className="benefits-section">
              <h3>What We Offer:</h3>
              <ul className="benefits-list">
                <li>Flexible schedule options</li>
                <li>High-traffic location to build your clientele</li>
                <li>Positive, professional atmosphere</li>
                <li>Marketing support + social media features</li>
                <li>Product discounts & networking opportunities</li>
              </ul>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSePvYuDk2nTKs1ZCAbIvwmh64DVarJEVeUOgTXwGg1V3kUc3w/viewform?usp=dialog"
              className="btn btn-cta"
              target="_blank"
              rel="noopener"
              aria-label="Apply to join the Salon 803 team (opens in a new tab)"
            >
              Apply Now
            </a>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="container">
            <h2 id="contact-title" className="section-title">
              Contact Us
            </h2>
            <p className="section-text">We'd love to hear from you!</p>

            <div className="contact-grid" role="list">
              <div className="contact-card" role="listitem">
                <svg
                  className="icon-primary"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <h3>Address</h3>
                <p>
                  4444 Cypress Creek Parkway
                  <br />
                  STE 30
                  <br />
                  Houston, TX 77068
                </p>
              </div>

              <div className="contact-card" role="listitem">
                <svg
                  className="icon-primary"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <h3>Phone</h3>
                <p>
                  <a href="tel:+18326572126">(832) 657-2126</a>
                </p>
              </div>

              <div className="contact-card" role="listitem">
                <svg
                  className="icon-primary"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <h3>Email</h3>
                <p>
                  <a href="mailto:info@salon803.com">info@salon803.com</a>
                </p>
              </div>
            </div>

            <div className="contact-buttons">
              <button className="btn btn-cta" onClick={handleCall}>
                Call Now
              </button>
              <button className="btn btn-primary" onClick={handleEmail}>
                Email Us
              </button>
              <button className="btn btn-secondary" onClick={openDirections}>
                Get Directions
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer-copy">
            © <span id="currentYear"></span> Salon 803. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Index;
