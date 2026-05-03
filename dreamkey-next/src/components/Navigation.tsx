'use client';

import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`navbar-dark py-3 transition-all ${scrolled || pathname !== '/' ? 'bg-dark bg-opacity-75 shadow-sm blur-backdrop' : 'bg-transparent'}`}
      style={scrolled || pathname !== '/' ? { backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' } : {}}
    >
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2" style={{ letterSpacing: '1px', fontSize: '1.5rem' }}>
          DreamKey<span style={{ color: 'var(--accent)' }}>Properties</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-4">
            <Nav.Link as={Link} href="/" active={pathname === '/'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Home</Nav.Link>
            <Nav.Link as={Link} href="/listings" active={pathname === '/listings'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Listings</Nav.Link>
            <Nav.Link as={Link} href="/about" active={pathname === '/about'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>About</Nav.Link>
            <Nav.Link as={Link} href="/services" active={pathname === '/services'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Services</Nav.Link>
            <Nav.Link as={Link} href="/contact" active={pathname === '/contact'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
