import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Index = () => {
  useEffect(() => {
    const yearSpan = document.getElementById('year')
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear().toString()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCall = () => {
    window.location.href = 'tel:+18033560313'
  }

  const handleEmail = () => {
    window.location.href = 'mailto:TheSalon803@gmail.com'
  }

  const openDirections = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=320+Springlake+Road+West+Columbia+SC+29172', '_blank')
  }

  return (
    <>
      <Helmet>
        <title>Salon 803 | Professional Hair Care in West Columbia, SC</title>
        <meta name="description" content="Salon 803 offers professional hair services including braids, weaves, wigs, and natural hair care in West Columbia, South Carolina." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            "name": "Salon 803",
            "description": "Professional hair care and styling services",
            "telephone": "+1-803-356-0313",
            "email": "TheSalon803@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "320 Springlake Road",
              "addressLocality": "West Columbia",
              "addressRegion": "SC",
              "postalCode": "29172",
              "addressCountry": "US"
            }
          })}
        </script>
      </Helmet>

      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #f5f5f5;
        }

        header {
          text-align: center;
          padding: 4rem 1.5rem;
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95)),
                      url('https://storage.googleapis.com/gpt-engineer-file-uploads/lNSXR17kHEfQO3VLkRaOzo1pySM2/uploads/1761006518131-salon803.jpg') center/cover;
          border-bottom: 2px solid rgba(212, 175, 55, 0.3);
          position: relative;
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0;
          color: #d4af37;
          letter-spacing: 0.05em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .tagline {
          font-size: 1.3rem;
          font-weight: 300;
          color: #e0e0e0;
          margin-top: 1rem;
        }

        .cta-button, .service-link, .hire-button, .back-link {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 0.9rem 2.5rem;
          background: linear-gradient(135deg, #d4af37, #c19a2e);
          color: #1a1a2e;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .cta-button:hover, .service-link:hover, .hire-button:hover, .back-link:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
        }

        section {
          max-width: 900px;
          margin: 3rem auto;
          padding: 0 1.5rem;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          color: #d4af37;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        p {
          line-height: 1.8;
          color: #ddd;
          font-size: 1.05rem;
          margin-bottom: 1rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .service-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .service-item:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
        }

        .service-item h3 {
          font-family: 'Playfair Display', serif;
          color: #d4af37;
          margin: 0 0 0.75rem 0;
          font-size: 1.3rem;
        }

        .service-item p {
          color: #ccc;
          font-size: 0.95rem;
        }

        .contact-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin: 2rem 0;
        }

        .contact-btn {
          padding: 0.75rem 2rem;
          background: rgba(212, 175, 55, 0.1);
          border: 2px solid #d4af37;
          color: #d4af37;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .contact-btn:hover {
          background: #d4af37;
          color: #1a1a2e;
          transform: scale(1.05);
        }

        footer {
          text-align: center;
          padding: 2rem;
          color: #aaa;
          font-size: 0.9rem;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          margin-top: 3rem;
        }

        .hiring-section {
          text-align: center;
          background: rgba(212, 175, 55, 0.05);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          padding: 2rem;
          margin: 3rem auto;
        }

        .hiring-section h2 {
          color: #d4af37;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }
          .tagline {
            font-size: 1rem;
          }
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header>
        <h1>SALON 803</h1>
        <p className="tagline">Where Beauty Meets Expertise</p>
        <button onClick={() => scrollToSection('services')} className="cta-button">
          Explore Our Services
        </button>
      </header>

      <main>
        <section id="mission">
          <h2>Our Mission</h2>
          <p>
            At Salon 803, we believe that everyone deserves to feel confident and beautiful. Our mission is to provide top-tier hair care services in a welcoming and professional environment. Whether you're looking for a fresh new style, protective braids, or expert wig installation, our skilled stylists are here to bring your vision to life.
          </p>
        </section>

        <section id="passion">
          <h2>Our Passion</h2>
          <p>
            Hair is more than just strands—it's an expression of who you are. We're passionate about helping you discover and embrace your unique style. From natural hair care to intricate braiding techniques and flawless weave installations, we treat every client with personalized attention and care.
          </p>
        </section>

        <section id="services">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Braids & Protective Styles</h3>
              <p>Knotless braids, box braids, cornrows, and twist styles designed to protect and beautify your natural hair.</p>
            </div>
            <div className="service-item">
              <h3>Weaves & Sew-Ins</h3>
              <p>Traditional and modern sew-in techniques for seamless, natural-looking results.</p>
            </div>
            <div className="service-item">
              <h3>Wig Installation</h3>
              <p>Professional wig installs with closures and frontals for a flawless, versatile look.</p>
            </div>
            <div className="service-item">
              <h3>Natural Hair Care</h3>
              <p>Deep conditioning, trims, silk presses, and blow-outs to keep your natural hair healthy and thriving.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="service-link">View All Services & Pricing</Link>
          </div>
        </section>

        <section id="location">
          <h2>Visit Us</h2>
          <p style={{ textAlign: 'center' }}>
            <strong>Address:</strong><br />
            320 Springlake Road<br />
            West Columbia, SC 29172
          </p>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={openDirections} className="contact-btn">Get Directions</button>
          </div>
        </section>

        <section className="hiring-section">
          <h2>We're Hiring!</h2>
          <p>
            Are you a talented stylist looking for a professional and supportive work environment? Salon 803 is expanding and we'd love to have you join our team. Reach out to learn more about opportunities to grow your career with us.
          </p>
          <button onClick={handleEmail} className="hire-button">Contact Us About Career Opportunities</button>
        </section>

        <section id="contact">
          <h2>Get In Touch</h2>
          <p style={{ textAlign: 'center' }}>
            Ready to book your appointment or have questions? We'd love to hear from you!
          </p>
          <div className="contact-buttons">
            <button onClick={handleCall} className="contact-btn">📞 Call Us</button>
            <button onClick={handleEmail} className="contact-btn">✉️ Email Us</button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.95rem', color: '#aaa' }}>
            <strong>Phone:</strong> (803) 356-0313<br />
            <strong>Email:</strong> TheSalon803@gmail.com
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; <span id="year"></span> Salon 803. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Index
