'use client';

import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/lib/api';

export default function ListingsClient({ initialProperties }: { initialProperties: Property[] }) {
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  
  const filtered = initialProperties.filter(p => {
    if (type !== 'All' && p.type !== type) return false;
    if (status !== 'All' && p.status !== status) return false;
    if (maxPrice && p.price > parseInt(maxPrice)) return false;
    return true;
  });

  return (
    <>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'rgba(26, 26, 26, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-soft)',
          marginTop: '-50px',
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Property Type</label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)} className="border-secondary text-white">
              <option value="All">All Types</option>
              <option value="House">Houses</option>
              <option value="Flat">Flats</option>
              <option value="Land">Land</option>
            </Form.Select>
          </div>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Status</label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} className="border-secondary text-white">
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="UnderConstruction">Under Construction</option>
            </Form.Select>
          </div>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Max Price (₹)</label>
            <Form.Control type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="E.g. 5000000" className="border-secondary text-white" />
          </div>
        </div>
      </div>

      <section className="py-5" style={{ padding: '120px 0' }}>
        <Container>
          <div className="mb-4 text-muted fw-medium">
            Showing <span>{filtered.length}</span> properties
          </div>
          
          <Row className="g-4">
            {filtered.length > 0 ? (
              filtered.map(property => (
                <Col lg={4} md={6} key={property.id}>
                  <PropertyCard property={property} />
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <div style={{ fontSize: '4rem', color: 'var(--text-muted)', marginBottom: '2rem', opacity: 0.5 }}>🔍</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>No properties found</h2>
                <p className="text-muted">Try adjusting your search filters.</p>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}
