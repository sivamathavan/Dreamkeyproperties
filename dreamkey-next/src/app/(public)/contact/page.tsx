import { Container, Row, Col } from 'react-bootstrap';

export const metadata = {
  title: 'Contact Us | DreamKey Properties',
  description: 'Get in touch with DreamKey Properties to find your dream property.',
};

export default function ContactPage() {
  return (
    <>
      <header className="text-center" style={{ backgroundColor: 'var(--primary)', color: 'white', paddingTop: '180px', paddingBottom: '100px' }}>
        <Container>
          <span className="section-tag" style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem', display: 'block', marginBottom: '1rem' }}>
            Connect With Us
          </span>
          <h1 className="display-3" style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            Let&apos;s Find Your <span style={{ color: 'var(--accent)' }}>Dream</span>
          </h1>
        </Container>
      </header>

      <section className="py-5" style={{ background: 'var(--bg-main)', padding: '100px 0' }}>
        <Container>
          <Row className="gy-5 gx-lg-5">
            {/* Left Column - Contact Info */}
            <Col lg={4}>
              <div className="p-4" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)' }}>
                <div className="d-flex gap-3 mb-4 align-items-center">
                  <div style={{ width: '50px', height: '50px', background: 'var(--bg-main)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '1.25rem', flexShrink: 0 }}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--text-gray)' }}>Call Us</div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>+91 6382987874</div>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-4 align-items-center">
                  <div style={{ width: '50px', height: '50px', background: 'var(--bg-main)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '1.25rem', flexShrink: 0 }}>
                    <i className="fab fa-instagram"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--text-gray)' }}>Follow Us</div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                      <a href="https://www.instagram.com/dream_key_properties.26" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>dream_key_properties.26</a>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-5 align-items-center">
                  <div style={{ width: '50px', height: '50px', background: 'var(--bg-main)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '1.25rem', flexShrink: 0 }}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--text-gray)' }}>Our Office</div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>Vadavalli, Coimbatore-46</div>
                  </div>
                </div>

                <a href="https://wa.me/916382987874" target="_blank" rel="noreferrer" className="btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2" style={{ background: '#25d366', color: 'white', borderRadius: '12px' }}>
                  <i className="fab fa-whatsapp fs-5"></i> Chat on WhatsApp
                </a>
              </div>
            </Col>

            {/* Right Column - Contact Form */}
            <Col lg={8}>
              <div className="p-4 p-md-5" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)' }}>
                <form action="mailto:tamil101731@gmail.com" method="GET">
                  <Row className="g-4 mb-4">
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="fw-bold d-block mb-2" style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Full Name</label>
                        <input type="text" name="name" placeholder="John Doe" required className="form-control p-3 bg-dark text-white border-secondary rounded-4" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="fw-bold d-block mb-2" style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Email Address</label>
                        <input type="email" name="email" placeholder="john@example.com" required className="form-control p-3 bg-dark text-white border-secondary rounded-4" />
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <label className="fw-bold d-block mb-2" style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Interested In</label>
                        <select name="interest" className="form-select p-3 bg-dark text-white border-secondary rounded-4">
                          <option>Luxury Villa</option>
                          <option>Urban Penthouse</option>
                          <option>Residential Land</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <label className="fw-bold d-block mb-2" style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Your Message</label>
                        <textarea name="body" rows={6} placeholder="Tell us about your requirements..." className="form-control p-3 bg-dark text-white border-secondary rounded-4"></textarea>
                      </div>
                    </Col>
                  </Row>
                  <button type="submit" className="btn btn-primary w-100 py-3 rounded-4 fw-bold">Send Message</button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
