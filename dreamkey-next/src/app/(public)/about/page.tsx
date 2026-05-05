import { Container, Row, Col } from 'react-bootstrap';

export const metadata = {
  title: 'About Us | DreamKey Properties',
  description: 'Learn about DreamKey Properties legacy and our mission to provide exceptional luxury living spaces.',
};

export default function AboutPage() {
  return (
    <>
      <header className="text-center" style={{ 
        background: `linear-gradient(rgba(15, 15, 15, 0.8), rgba(15, 15, 15, 0.8)), url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        paddingTop: '180px', 
        paddingBottom: '100px' 
      }}>
        <Container>
          <span className="section-tag" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem', display: 'block', marginBottom: '1rem' }}>
            Established 2005
          </span>
          <h1 className="display-3" style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            Our Legacy, Your <span style={{ color: 'var(--accent)' }}>Future</span>
          </h1>
        </Container>
      </header>

      <section className="py-5" style={{ padding: '100px 0' }}>
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" alt="Luxury Villa Interior" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </Col>
            <Col lg={6} className="ps-lg-5">
              <h2 className="mb-4" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>Crafting Exceptional Living Spaces Since 2005</h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.8 }}>
                DreamKey Properties started with a simple vision: to make the property buying experience as elegant and trustworthy as the homes we represent. Today, we are proud to be a market leader in luxury real estate.
              </p>
              <div className="d-flex gap-5 mt-5">
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>500+</div>
                  <div style={{ fontWeight: 700, marginTop: '0.5rem', color: 'var(--text-main)' }}>Properties Sold</div>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>20+</div>
                  <div style={{ fontWeight: 700, marginTop: '0.5rem', color: 'var(--text-main)' }}>Years Excellence</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ background: 'var(--bg-light)', padding: '100px 0' }}>
        <Container className="text-center">
          <h2 className="mb-5" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>The Pillars of Our Success</h2>
          <Row className="gy-4 mt-4">
            <Col md={4}>
              <div className="p-4" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: '100%' }}>
                <i className="fas fa-landmark mb-4" style={{ fontSize: '3rem', color: 'var(--accent)' }}></i>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Integrity</h3>
                <p style={{ color: 'var(--text-gray)', lineHeight: 1.6 }}>Absolute transparency in every legal and financial dealing.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: '100%' }}>
                <i className="fas fa-lightbulb mb-4" style={{ fontSize: '3rem', color: 'var(--accent)' }}></i>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Innovation</h3>
                <p style={{ color: 'var(--text-gray)', lineHeight: 1.6 }}>Leveraging technology for better property viewing experiences.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: '100%' }}>
                <i className="fas fa-users mb-4" style={{ fontSize: '3rem', color: 'var(--accent)' }}></i>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Community</h3>
                <p style={{ color: 'var(--text-gray)', lineHeight: 1.6 }}>Building relationships that last beyond the closing signature.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
