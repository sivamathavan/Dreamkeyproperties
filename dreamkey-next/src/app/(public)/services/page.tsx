import { Container, Row, Col } from 'react-bootstrap';

export const metadata = {
  title: 'Our Services | DreamKey Properties',
  description: 'Expert solutions for buying, site visits, and documentation support.',
};

export default function ServicesPage() {
  return (
    <>
      <header className="text-center" style={{ 
        background: `linear-gradient(rgba(15, 15, 15, 0.8), rgba(15, 15, 15, 0.8)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        paddingTop: '180px', 
        paddingBottom: '100px' 
      }}>
        <Container>
          <span className="section-tag" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem', display: 'block', marginBottom: '1rem' }}>
            Expert Solutions
          </span>
          <h1 className="display-3" style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            Real Estate <span style={{ color: 'var(--accent)' }}>Refined</span>
          </h1>
        </Container>
      </header>

      <section className="py-5" style={{ padding: '100px 0' }}>
        <Container>
          <Row className="gy-4">
            <Col md={4}>
              <div className="p-4 h-100" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)', transition: 'var(--transition)' }}>
                <div style={{ width: '70px', height: '70px', background: 'var(--bg-main)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--accent)', marginBottom: '2rem' }}>
                  <i className="fas fa-home"></i>
                </div>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Buying Assistance</h3>
                <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', lineHeight: 1.6 }}>
                  Expert guidance through the entire property finding and purchasing process, ensuring you find the right fit for your budget.
                </p>
                <ul className="list-unstyled" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                  <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i> Market Analysis</li>
                  <li><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i> Price Negotiation</li>
                </ul>
              </div>
            </Col>

            <Col md={4}>
              <div className="p-4 h-100" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)', transition: 'var(--transition)' }}>
                <div style={{ width: '70px', height: '70px', background: 'var(--bg-main)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--accent)', marginBottom: '2rem' }}>
                  <i className="fas fa-car"></i>
                </div>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Site Visits</h3>
                <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', lineHeight: 1.6 }}>
                  Complimentary chauffeured visits to all shortlisted properties at your convenience with our property experts.
                </p>
                <ul className="list-unstyled" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                  <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i> Flexible Scheduling</li>
                  <li><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i> Expert Commentary</li>
                </ul>
              </div>
            </Col>

            <Col md={4}>
              <div className="p-4 h-100" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)', transition: 'var(--transition)' }}>
                <div style={{ width: '70px', height: '70px', background: 'var(--bg-main)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--accent)', marginBottom: '2rem' }}>
                  <i className="fas fa-file-contract"></i>
                </div>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Documentation Support</h3>
                <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', lineHeight: 1.6 }}>
                  Hassle-free legal and registration paperwork managed by our expert legal team for complete peace of mind.
                </p>
                <ul className="list-unstyled" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                  <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i> Title Verification</li>
                  <li><i className="fas fa-check-circle me-2" style={{ color: 'var(--accent)' }}></i> Registration Help</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
