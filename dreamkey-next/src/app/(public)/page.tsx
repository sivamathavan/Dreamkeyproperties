import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/lib/api';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const properties = await fetchProperties();
  const featured = properties.filter(p => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <header className="hero d-flex align-items-center" style={{
        height: '100vh',
        minHeight: '800px',
        background: `linear-gradient(to right, rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.5)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <Container>
          <div className="hero-content" style={{ maxWidth: '800px', paddingTop: '80px' }}>
            <span className="section-tag mb-3 d-block" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem' }}>Premium Real Estate</span>
            <h1 className="display-3 fw-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Find Your Dream Property in <span style={{ color: 'var(--accent)' }}>Coimbatore</span>
            </h1>
            <p className="lead text-muted mb-5 fw-light" style={{ maxWidth: '600px' }}>
              Exclusive portfolio of luxury estates, modern apartments, and strategic land in prime locations with expert guidance at every step.
            </p>

            <div className="d-flex gap-3 flex-wrap mt-4">
              <Link href="/listings" className="btn btn-primary px-4 py-3">View Properties</Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="btn btn-outline-primary px-4 py-3 d-inline-flex align-items-center">
                <img src="/whatsapp.svg" alt="WhatsApp" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </header>

      {/* Featured Properties */}
      <section className="py-5" style={{ padding: '120px 0' }}>
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
            <div>
              <span className="section-tag mb-2 d-block" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem' }}>Our Portfolio</span>
              <h2 className="display-5 fw-bold" style={{ fontFamily: 'var(--font-heading)' }}>Featured Properties</h2>
            </div>
            <Link href="/listings" className="btn btn-outline-primary px-4 py-2">View All Listings</Link>
          </div>

          <Row className="g-4">
            {featured.length > 0 ? (
              featured.map(property => (
                <Col lg={4} md={6} key={property.id}>
                  <PropertyCard property={property} />
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <p className="text-muted">No featured properties at the moment.</p>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-light)', padding: '120px 0' }}>
        <Container>
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
            <span className="section-tag mb-2 d-block" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem' }}>Why DreamKey</span>
            <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Experience the Advantage</h2>
            <p className="text-muted">
              We don't just sell properties; we find the keys to your future. Our commitment to excellence ensures a seamless real estate journey.
            </p>
          </div>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="h-100 p-5 text-center transition-all" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1.5rem' }}>🛡️</div>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Trusted Expertise</h3>
                <p className="text-muted small mb-0">Over 20 years of experience in high-end real estate transactions.</p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="h-100 p-5 text-center transition-all" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1.5rem' }}>👑</div>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Premium Selection</h3>
                <p className="text-muted small mb-0">Curated properties that meet our strict quality and value standards.</p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="h-100 p-5 text-center transition-all" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1.5rem' }}>⚡</div>
                <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Fast Processing</h3>
                <p className="text-muted small mb-0">Quick documentation and smooth legal assistance for every deal.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="py-5 text-center" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '100px 0' }}>
        <Container>
          <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Ready to find your Dream Property?</h2>
          <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: '800px' }}>
            Join hundreds of happy families who found their perfect home through DreamKey Properties. Schedule a personalized consultation today.
          </p>
          <Link href="/contact" className="btn btn-primary px-5 py-3 fs-5">
            Book a Site Visit Today
          </Link>
        </Container>
      </section>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/1234567890" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <img src="/whatsapp.svg" alt="Contact us on WhatsApp" />
      </a>
    </>
  );
}
