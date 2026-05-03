'use client';

import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-main)', borderTop: '1px solid var(--border-color)', padding: '80px 0 40px' }}>
      <Container>
        <Row className="gy-4 mb-5">
          <Col lg={4}>
            <Link href="/" className="d-flex align-items-center gap-2 mb-3" style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>
              DreamKey<span style={{ color: 'var(--accent)' }}>Properties</span>
            </Link>
            <p className="text-muted fw-light mt-3">
              Exclusive portfolio of luxury estates and premium land investments.
            </p>
          </Col>
          <Col lg={2} md={4}>
            <h4 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '2rem' }}>Quick Links</h4>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <li><Link href="/" className="text-muted text-decoration-none transition-all hover-accent">Home</Link></li>
              <li><Link href="/listings" className="text-muted text-decoration-none transition-all hover-accent">Listings</Link></li>
              <li><Link href="/about" className="text-muted text-decoration-none transition-all hover-accent">About</Link></li>
              <li><Link href="/contact" className="text-muted text-decoration-none transition-all hover-accent">Contact</Link></li>
            </ul>
          </Col>
          <Col lg={2} md={4}>
            <h4 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '2rem' }}>Services</h4>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <li><Link href="/services" className="text-muted text-decoration-none transition-all hover-accent">Buying</Link></li>
              <li><Link href="/services" className="text-muted text-decoration-none transition-all hover-accent">Site Visits</Link></li>
              <li><Link href="/services" className="text-muted text-decoration-none transition-all hover-accent">Valuation</Link></li>
              <li><Link href="/services" className="text-muted text-decoration-none transition-all hover-accent">Support</Link></li>
            </ul>
          </Col>
          <Col lg={4} md={4}>
            <h4 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '2rem' }}>Contact</h4>
            <ul className="list-unstyled d-flex flex-column gap-3 text-muted">
              <li>
                <span style={{ color: 'var(--accent)', marginRight: '10px' }}>📍</span> Vadavalli, Coimbatore-46
              </li>
              <li>
                <span style={{ color: 'var(--accent)', marginRight: '10px' }}>📞</span> +91 6382987874
              </li>
              <li>
                <span style={{ color: 'var(--accent)', marginRight: '10px' }}>📸</span> 
                <a href="https://www.instagram.com/dream_key_properties.26" target="_blank" rel="noreferrer" className="text-muted text-decoration-none">dream_key_properties.26</a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text-center text-muted pt-4" style={{ borderTop: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
          <p className="mb-0">&copy; {new Date().getFullYear()} DreamKey Properties. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
