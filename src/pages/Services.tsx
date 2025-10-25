import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Services = () => {
  useEffect(() => {
    const yearSpan = document.getElementById('currentYear')
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear().toString()
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Salon 803 | Full Service Menu & Pricing</title>
        <meta name="description" content="Complete menu of hair services at Salon 803, including braids, weaves, wigs, natural hair care, and more." />
      </Helmet>

      <header className="section gradient-section" aria-label="Salon 803 Services">
        <div className="container">
          <nav style={{ marginBottom: '1rem' }}>
            <Link to="/" className="btn btn-secondary">← Back to Home</Link>
          </nav>

          <div className="subtitle" style={{ textTransform: 'uppercase', letterSpacing: '3px', opacity: '.9' }}>Salon 803</div>
          <h1 className="section-title" style={{ color: '#fff' }}>Full Service Menu & Pricing</h1>
          <p className="section-subtitle" style={{ color: '#e6f6f8' }}>
            Explore our complete list of services below. Your beauty, our expertise.
          </p>
        </div>
      </header>

      <main className="section">
        <div className="container-wide">
          <section className="services-grid">
            <div className="service-card">
              <h3>Traditional Sew-In</h3>
              <p>Classic protective style with natural-looking results.</p>
              <div className="price">$75</div>
            </div>
            <div className="service-card">
              <h3>Versatile Sew-In</h3>
              <p>Flexible styling options for any occasion.</p>
              <div className="price">$115</div>
            </div>
            <div className="service-card">
              <h3>Closure Sew-In</h3>
              <p>Seamless closure for a natural finish.</p>
              <div className="price">$110</div>
            </div>
            <div className="service-card">
              <h3>Frontal Sew-In</h3>
              <p>Hairline perfection with frontal installation.</p>
              <div className="price">$125</div>
            </div>
            <div className="service-card">
              <h3>Closure Wig Install</h3>
              <p>Professional wig installation with closure.</p>
              <div className="price">$135</div>
            </div>
            <div className="service-card">
              <h3>Frontal Wig Install</h3>
              <p>Flawless frontal wig application.</p>
              <div className="price">$145</div>
            </div>
            <div className="service-card">
              <h3>Traditional Quick Weave</h3>
              <p>Fast, beautiful protective styling.</p>
              <div className="price">$65</div>
            </div>
            <div className="service-card">
              <h3>Closure Quick Weave</h3>
              <p>Quick weave with natural closure.</p>
              <div className="price">$75</div>
            </div>
            <div className="service-card">
              <h3>Frontal Quick Weave</h3>
              <p>Quick weave with frontal piece.</p>
              <div className="price">$85</div>
            </div>
            <div className="service-card">
              <h3>Hair Wash</h3>
              <p>Deep cleansing and conditioning treatment.</p>
              <div className="price">$25</div>
            </div>
            <div className="service-card">
              <h3>Circle Braids</h3>
              <p>Intricate braiding patterns.</p>
              <div className="price">$15</div>
            </div>
            <div className="service-card">
              <h3>Blow Out</h3>
              <p>Professional blow dry and styling.</p>
              <div className="price">$45</div>
            </div>
            <div className="service-card">
              <h3>Silk Press</h3>
              <p>Smooth, silky straight styling.</p>
              <div className="price">$35</div>
            </div>
            <div className="service-card">
              <h3>Take Down</h3>
              <p>Safe and gentle style removal.</p>
              <div className="price">$15</div>
            </div>
            <div className="service-card">
              <h3>Detailed Cut</h3>
              <p>Precision cutting and shaping.</p>
              <div className="price">$10</div>
            </div>
            <div className="service-card">
              <h3>With Adhesive</h3>
              <p>Secure adhesive application.</p>
              <div className="price">$10</div>
            </div>
            <div className="service-card">
              <h3>Thick Hair</h3>
              <p>Additional service for thick hair.</p>
              <div className="price">$5</div>
            </div>
          </section>

          <p className="note" style={{ textAlign: 'center', color: '#555', marginTop: '2rem' }}>
            * Prices may vary based on hair length, texture, or additional services.
          </p>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/" className="btn btn-secondary">← Back to Home</Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer-copy">© <span id="currentYear"></span> Salon 803. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Services
