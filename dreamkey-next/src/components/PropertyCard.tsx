'use client';

import Link from 'next/link';
import { Card, Badge } from 'react-bootstrap';
import { Property } from '@/lib/api';

export default function PropertyCard({ property }: { property: Property }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const thumb = property.images?.[0] || 'https://via.placeholder.com/600x400';

  return (
    <Card className="property-card h-100 border-0 bg-transparent">
      <div className="property-image position-relative" style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
        <Card.Img 
          variant="top" 
          src={thumb} 
          alt={property.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} 
        />
        <Badge 
          bg="warning" 
          text="dark" 
          className="position-absolute top-0 start-0 m-3 px-3 py-2 text-uppercase" 
          style={{ letterSpacing: '1px', fontWeight: 600, zIndex: 2 }}
        >
          {property.type}
        </Badge>
        <Badge 
          bg="dark" 
          className="position-absolute top-0 end-0 m-3 px-3 py-2 text-uppercase bg-opacity-75" 
          style={{ backdropFilter: 'blur(5px)', letterSpacing: '1px', fontWeight: 500, zIndex: 2 }}
        >
          {property.status}
        </Badge>
      </div>
      <Card.Body className="p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderTop: 'none', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
        <div className="text-muted small mb-3 d-flex align-items-center gap-2">
          <span style={{ color: 'var(--accent)' }}>📍</span> {property.location}
        </div>
        <Card.Title className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 500 }}>{property.title}</Card.Title>
        
        <div className="d-flex justify-content-between py-3 mb-4" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          {property.type !== 'Land' && (
            <>
              <div className="text-muted small d-flex align-items-center gap-2">
                <span style={{ color: 'var(--accent)' }}>🛏️</span> {property.bedrooms || 0} Beds
              </div>
              <div className="text-muted small d-flex align-items-center gap-2">
                <span style={{ color: 'var(--accent)' }}>🚿</span> {property.bathrooms || 0} Baths
              </div>
            </>
          )}
          <div className="text-muted small d-flex align-items-center gap-2">
            <span style={{ color: 'var(--accent)' }}>📐</span> {property.area} sqft
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--accent)', fontWeight: 600 }}>
            {formatPrice(property.price)}
          </div>
          <Link href={`/property/${property.slug}`} className="btn btn-primary btn-sm px-4 py-2">
            Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
