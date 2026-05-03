'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Table } from 'react-bootstrap';
import { adminSignIn, adminSignOut, getAdminUser, fetchProperties, syncProperty, removeProperty, uploadToSupabase, Property } from '@/lib/api';

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [properties, setProperties] = useState<Property[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '', location: '', type: 'House', status: 'Available',
    price: 0, area: 0, bedrooms: 0, bathrooms: 0, description: '',
    amenities: [], images: [], video: '', featured: true
  });
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setIsLoading(true);
    const user = await getAdminUser();
    if (user) {
      setSession(user);
      loadProperties();
    } else {
      setSession(null);
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { data, error } = await adminSignIn(email, password);
    if (error) {
      setAuthError(error.message);
    } else {
      checkSession();
    }
  };

  const handleLogout = async () => {
    await adminSignOut();
    checkSession();
  };

  const loadProperties = async () => {
    const data = await fetchProperties();
    setProperties(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await removeProperty(id);
        loadProperties();
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '', location: '', type: 'House', status: 'Available',
      price: 0, area: 0, bedrooms: 0, bathrooms: 0, description: '',
      amenities: [], images: [], video: '', featured: true
    });
    setImageFiles(null);
    setVideoFile(null);
    setShowModal(true);
  };

  const openEditModal = (p: Property) => {
    setEditingId(p.id);
    setFormData({ ...p });
    setImageFiles(null);
    setVideoFile(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let finalImages = formData.images || [];
      let finalVideo = formData.video || '';

      if (imageFiles && imageFiles.length > 0) {
        finalImages = []; // overwrite if new images provided
        for (let i = 0; i < imageFiles.length; i++) {
          const url = await uploadToSupabase(imageFiles[i]);
          if (url) finalImages.push(url);
        }
      }

      if (videoFile) {
        const url = await uploadToSupabase(videoFile);
        if (url) finalVideo = url;
      }

      const newProperty: Property = {
        ...(formData as Property),
        id: editingId || Date.now().toString(),
        slug: formData.title!.toLowerCase().split(' ').join('-').replace(/[^\w-]/g, ''),
        images: finalImages.length > 0 ? finalImages : ['https://via.placeholder.com/600x400'],
        video: finalVideo,
      };

      await syncProperty(newProperty);
      setShowModal(false);
      loadProperties();
      alert('Property saved successfully!');
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'var(--bg-main)' }}>Loading...</div>;

  if (!session) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: 'var(--bg-main)' }}>
        <div style={{ background: 'var(--bg-card)', padding: '4rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', maxWidth: '450px', width: '90%', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '2rem' }}>🛡️</div>
          <h2 className="mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Admin Access</h2>
          <p className="text-muted mb-4">Secure entrance for DreamKey authorized personnel only.</p>
          <Form onSubmit={handleLogin}>
            <Form.Control type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3 p-3 text-center rounded-4 bg-dark text-white border-secondary" />
            <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 p-3 text-center rounded-4 bg-dark text-white border-secondary" />
            <Button type="submit" variant="primary" className="w-100 py-3 rounded-4">Sign In</Button>
            {authError && <p className="text-danger mt-3 fw-bold">{authError}</p>}
          </Form>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '280px', background: 'var(--bg-card)', height: '100vh', position: 'fixed', padding: '2rem', 
        borderRight: '1px solid var(--border-color)', zIndex: 100,
        left: sidebarOpen ? '0' : undefined, transition: '0.3s ease'
      }} className={`d-none d-lg-block ${sidebarOpen ? 'd-block position-fixed' : ''}`}>
        <div className="d-flex align-items-center gap-2 mb-5" style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
          DreamKey<span style={{ color: 'var(--accent)' }}>Admin</span>
        </div>
        <div className="p-3 mb-2 rounded" style={{ background: 'var(--accent)', color: '#000', fontWeight: 600, cursor: 'pointer' }}>
          <span className="me-2">📋</span> Listings
        </div>
        <div className="p-3 mb-2 rounded text-muted hover-accent" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <span className="me-2">🌐</span> Public Site
        </div>
        <div className="p-3 mt-auto rounded text-danger" style={{ cursor: 'pointer', position: 'absolute', bottom: '2rem' }} onClick={handleLogout}>
          <span className="me-2">🚪</span> Sign Out
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? '0' : '280px', padding: '4rem' }} className="admin-main-responsive">
        <div className="d-lg-none d-flex justify-content-between align-items-center mb-4 p-3 rounded" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>DreamKey Admin</div>
          <Button variant="outline-primary" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</Button>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
          <div>
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>Property Inventory</h1>
            <p className="text-muted">Manage your real estate catalog in real-time.</p>
          </div>
          <Button variant="primary" onClick={openAddModal}>+ Add New Property</Button>
        </div>

        <div className="d-flex flex-column gap-3">
          {properties.length === 0 ? (
            <div className="text-center p-5 text-muted">No properties found.</div>
          ) : (
            properties.map(p => (
              <div key={p.id} className="d-flex flex-column flex-md-row align-items-md-center justify-content-between p-4 rounded" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', transition: 'var(--transition)' }}>
                <div className="d-flex align-items-center gap-4 mb-3 mb-md-0">
                  <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={p.images?.[0] || 'https://via.placeholder.com/600x400'} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>{p.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--accent)' }}>{p.status}</span> • {p.location} | {formatPrice(p.price)}
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-light" size="sm" onClick={() => openEditModal(p)}>Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered contentClassName="bg-dark text-white border-secondary">
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title style={{ fontFamily: 'var(--font-heading)' }}>{editingId ? 'Edit Property' : 'Add Property'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Title</Form.Label>
                  <Form.Control type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-dark text-white border-secondary" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Location</Form.Label>
                  <Form.Control type="text" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="bg-dark text-white border-secondary" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Type</Form.Label>
                  <Form.Select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="bg-dark text-white border-secondary">
                    <option>House</option><option>Flat</option><option>Land</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Status</Form.Label>
                  <Form.Select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="bg-dark text-white border-secondary">
                    <option>Available</option><option>Sold</option><option>UnderConstruction</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Price (₹)</Form.Label>
                  <Form.Control type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} className="bg-dark text-white border-secondary" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Area (sqft)</Form.Label>
                  <Form.Control type="number" required value={formData.area} onChange={e => setFormData({ ...formData, area: Number(e.target.value) })} className="bg-dark text-white border-secondary" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Bedrooms</Form.Label>
                  <Form.Control type="number" value={formData.bedrooms} onChange={e => setFormData({ ...formData, bedrooms: Number(e.target.value) })} className="bg-dark text-white border-secondary" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Bathrooms</Form.Label>
                  <Form.Control type="number" value={formData.bathrooms} onChange={e => setFormData({ ...formData, bathrooms: Number(e.target.value) })} className="bg-dark text-white border-secondary" />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Amenities (Comma Separated)</Form.Label>
                  <Form.Control type="text" value={formData.amenities?.join(', ')} onChange={e => setFormData({ ...formData, amenities: e.target.value.split(',').map(a => a.trim()).filter(a => a) })} className="bg-dark text-white border-secondary" placeholder="Pool, Gym, Parking" />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="bg-dark text-white border-secondary" />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Images</Form.Label>
                  <Form.Control type="file" multiple accept="image/*" onChange={e => setImageFiles((e.target as HTMLInputElement).files)} className="bg-dark text-white border-secondary mb-2" />
                  <div className="d-flex gap-2 flex-wrap">
                    {formData.images?.map((img, i) => (
                      <img key={i} src={img} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--accent)' }} />
                    ))}
                  </div>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="text-muted small text-uppercase">Video</Form.Label>
                  <Form.Control type="file" accept="video/*" onChange={e => setVideoFile((e.target as HTMLInputElement).files?.[0] || null)} className="bg-dark text-white border-secondary mb-2" />
                  {formData.video && <p className="small text-muted mb-0">Current Video Attached</p>}
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-secondary">
            <Button variant="outline-light" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Property'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <style jsx global>{`
        @media (max-width: 991px) {
          .admin-main-responsive {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
