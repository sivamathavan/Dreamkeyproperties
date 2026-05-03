import { Container } from 'react-bootstrap';
import { fetchProperties } from '@/lib/api';
import ListingsClient from './ListingsClient';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ListingsPage() {
  const properties = await fetchProperties();

  return (
    <>
      <header className="listings-header text-center" style={{ backgroundColor: 'var(--bg-main)', padding: '150px 0 100px' }}>
        <Container>
          <span className="section-tag" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem', display: 'block', marginBottom: '1rem' }}>
            Explore Inventory
          </span>
          <h1 className="display-3 fw-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Our <span style={{ color: 'var(--accent)' }}>Properties</span>
          </h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
            Wide range of premium houses, flats, and land. Filter to find your perfect match.
          </p>
        </Container>
      </header>

      <ListingsClient initialProperties={properties} />
    </>
  );
}
