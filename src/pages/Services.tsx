import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Salon 803</title>
        <meta name="description" content="Complete menu of hair services at Salon 803, including braids, weaves, wigs, natural hair care, and more." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </Helmet>

      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #f5f5f5;
        }

        .services-header {
          text-align: center;
          padding: 3rem 1.5rem;
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
          border-bottom: 2px solid rgba(212, 175, 55, 0.3);
        }

        .brand {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #d4af37;
          margin: 0 0 1rem 0;
          letter-spacing: 0.05em;
        }

        .services-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          margin: 0.5rem 0;
          color: #f5f5f5;
        }

        .services-header p {
          font-size: 1.1rem;
          color: #ccc;
          max-width: 600px;
          margin: 0 auto;
        }

        .services-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1.5rem 3rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .service-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
        }

        .service-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #d4af37;
          margin: 0 0 0.75rem 0;
        }

        .service-card p {
          font-size: 0.95rem;
          color: #ddd;
          line-height: 1.6;
          margin: 0 0 1rem 0;
        }

        .price {
          font-size: 1.3rem;
          font-weight: 600;
          color: #f5f5f5;
          margin-top: auto;
        }

        .back-link {
          display: inline-block;
          margin: 2rem auto;
          padding: 0.75rem 2rem;
          background: linear-gradient(135deg, #d4af37, #c19a2e);
          color: #1a1a2e;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-align: center;
        }

        .back-link:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
        }

        .note {
          text-align: center;
          padding: 2rem 1.5rem;
          color: #aaa;
          font-size: 0.9rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .back-container {
          text-align: center;
          padding: 2rem 0;
        }

        @media (max-width: 768px) {
          .services-header h1 {
            font-size: 2rem;
          }
          .brand {
            font-size: 1.5rem;
          }
          .services-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="services-header">
        <div className="brand">SALON 803</div>
        <h1>Our Services</h1>
        <p>Professional hair care and styling services tailored to you</p>
      </header>

      <div className="services-container">
        <div className="service-card">
          <h3>Traditional Sew-In</h3>
          <p>Classic protective style with natural-looking results and long-lasting hold.</p>
          <div className="price">$75</div>
        </div>

        <div className="service-card">
          <h3>Closure Wig Install</h3>
          <p>Professional wig installation with closure for a seamless, natural look.</p>
          <div className="price">$135</div>
        </div>

        <div className="service-card">
          <h3>Silk Press</h3>
          <p>Achieve smooth, silky straight hair with heat styling and thermal protection.</p>
          <div className="price">$35</div>
        </div>

        <div className="service-card">
          <h3>Blow Out</h3>
          <p>Professional blow dry and styling for volume and bounce.</p>
          <div className="price">$45</div>
        </div>

        <div className="service-card">
          <h3>Wig Install (No Closure)</h3>
          <p>Secure wig installation without closure for a quick transformation.</p>
          <div className="price">$100</div>
        </div>

        <div className="service-card">
          <h3>Frontal Wig Install</h3>
          <p>Full frontal wig install for maximum versatility in styling.</p>
          <div className="price">$150</div>
        </div>

        <div className="service-card">
          <h3>Knotless Braids</h3>
          <p>Gentle, lightweight braids that reduce tension on the scalp.</p>
          <div className="price">Starting at $150</div>
        </div>

        <div className="service-card">
          <h3>Box Braids</h3>
          <p>Classic protective box braids in various sizes and lengths.</p>
          <div className="price">Starting at $120</div>
        </div>

        <div className="service-card">
          <h3>Cornrows</h3>
          <p>Traditional cornrow styles, simple or intricate designs available.</p>
          <div className="price">Starting at $60</div>
        </div>

        <div className="service-card">
          <h3>Twist Styles</h3>
          <p>Two-strand twists or passion twists for a textured protective style.</p>
          <div className="price">Starting at $100</div>
        </div>

        <div className="service-card">
          <h3>Natural Hair Care</h3>
          <p>Deep conditioning, trims, and styling for natural hair health.</p>
          <div className="price">Starting at $40</div>
        </div>

        <div className="service-card">
          <h3>Hair Coloring</h3>
          <p>Professional color services including highlights, balayage, and full color.</p>
          <div className="price">Starting at $80</div>
        </div>
      </div>

      <p className="note">
        *Prices may vary based on hair length, texture, and additional styling requests.
        <br />Contact us for a personalized consultation and quote.
      </p>

      <div className="back-container">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </>
  )
}

export default Services
