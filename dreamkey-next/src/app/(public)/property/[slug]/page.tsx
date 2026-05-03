import { notFound } from 'next/navigation';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { getPropertyBySlug, fetchProperties } from '@/lib/api';
import PropertyGallery from '@/components/PropertyGallery';

export const revalidate = 60;

export async function generateStaticParams() {
  const properties = await fetchProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', backgroundColor: 'var(--bg-main)' }}>
      <Container>
        {/* Header */}
        <div className="mb-4">
          <div className="d-flex gap-3 mb-3">
            <span style={{ padding: '0.4rem 1rem', borderRadius: '4px', fontWeight: 500, background: 'var(--accent)', color: '#000', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              {property.type}
            </span>
            <span style={{ 
              background: property.status === 'Available' ? 'rgba(37, 211, 102, 0.2)' : 'rgba(244, 63, 94, 0.2)', 
              color: property.status === 'Available' ? '#25d366' : '#f43f5e', 
              border: `1px solid ${property.status === 'Available' ? '#25d366' : '#f43f5e'}`, 
              padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase' 
            }}>
              {property.status}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
            {property.title}
          </h1>
        </div>

        {/* Two-Column Layout */}
        <Row className="gy-5 gx-lg-5">
          {/* Left Column (Gallery) */}
          <Col lg={7}>
            <PropertyGallery images={property.images || ['https://via.placeholder.com/1200x800']} video={property.video} />
            
            <div className="mt-5">
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Description</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                {property.description}
              </p>
            </div>
            
            <div className="mt-5">
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Location Map</h4>
              <div style={{ height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <iframe width="100%" height="100%" frameBorder="0" src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} allowFullScreen></iframe>
              </div>
            </div>
          </Col>

          {/* Right Column (Sidebar) */}
          <Col lg={5}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
              
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Asking Price</div>
                <div style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
                  {formatPrice(property.price)}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--accent)' }}>📍</span> {property.location}
                </div>
              </div>

              <div className="d-grid gap-3 mb-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {property.type !== 'Land' && (
                  <>
                    <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛏️</div>
                      <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{property.bedrooms || 0} Beds</div>
                    </div>
                    <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚿</div>
                      <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{property.bathrooms || 0} Baths</div>
                    </div>
                  </>
                )}
                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)', gridColumn: property.type === 'Land' ? 'span 2' : 'auto' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📐</div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{property.area} Sqft</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1rem' }}>Amenities</h4>
                <div className="d-flex flex-wrap gap-2">
                  {property.amenities?.map((a, i) => (
                    <span key={i} style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                      <span style={{ color: 'var(--accent)', marginRight: '5px' }}>✓</span> {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="d-flex flex-column gap-3 mt-5">
                <a href={`https://wa.me/916382987874?text=${encodeURIComponent(`Hi, I am interested in ${property.title}`)}`} target="_blank" rel="noreferrer" className="btn btn-primary py-3 fw-medium d-flex align-items-center justify-content-center gap-2">
                  <i className="fab fa-whatsapp fs-5"></i> Book a Visit
                </a>
                <a href="tel:+916382987874" className="btn btn-outline-primary py-3 fw-medium d-flex align-items-center justify-content-center gap-2">
                  <i className="fas fa-phone"></i> Call Now
                </a>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
