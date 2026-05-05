'use client';

import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className={`navbar-dark py-3 transition-all ${scrolled || pathname !== '/' || expanded ? 'bg-dark bg-opacity-75 shadow-sm blur-backdrop' : 'bg-transparent'}`}
      style={scrolled || pathname !== '/' || expanded ? { backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' } : {}}
    >
      <Container>
        <Navbar.Brand as={Link} href="/" onClick={() => setExpanded(false)} className="d-flex align-items-center gap-2" style={{ letterSpacing: '1px', fontSize: '1.5rem' }}>
          DreamKey<span style={{ color: 'var(--accent)' }}>Properties</span>
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="border-0 shadow-none p-2" 
          style={{ background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-4 py-3 py-lg-0">
            <Nav.Link as={Link} href="/" onClick={() => setExpanded(false)} active={pathname === '/'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Home</Nav.Link>
            <Nav.Link as={Link} href="/listings" onClick={() => setExpanded(false)} active={pathname === '/listings'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Listings</Nav.Link>
            <Nav.Link as={Link} href="/about" onClick={() => setExpanded(false)} active={pathname === '/about'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>About</Nav.Link>
            <Nav.Link as={Link} href="/services" onClick={() => setExpanded(false)} active={pathname === '/services'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Services</Nav.Link>
            <Nav.Link as={Link} href="/contact" onClick={() => setExpanded(false)} active={pathname === '/contact'} style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
