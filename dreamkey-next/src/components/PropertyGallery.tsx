'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

interface PropertyGalleryProps {
  images: string[];
  video?: string;
}

export default function PropertyGallery({ images, video }: PropertyGalleryProps) {
  const [activeTab, setActiveTab] = useState<'images' | 'video'>('images');
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const hasVideo = !!video;
  const isYouTube = video?.includes('youtube.com') || video?.includes('youtu.be');

  return (
    <div className="media-hub position-relative mb-4" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      <div className="media-tabs d-flex p-2 gap-2 position-absolute" style={{ top: '1.5rem', left: '1.5rem', zIndex: 10, background: 'rgba(26,26,26,0.8)', backdropFilter: 'blur(10px)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <div 
          className="px-3 py-2 rounded" 
          style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'var(--transition)', background: activeTab === 'images' ? 'var(--accent)' : 'transparent', color: activeTab === 'images' ? '#000' : 'var(--text-main)' }}
          onClick={() => setActiveTab('images')}
        >
          <span className="me-2">📷</span> Photos
        </div>
        {hasVideo && (
          <div 
            className="px-3 py-2 rounded" 
            style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'var(--transition)', background: activeTab === 'video' ? 'var(--accent)' : 'transparent', color: activeTab === 'video' ? '#000' : 'var(--text-main)' }}
            onClick={() => setActiveTab('video')}
          >
            <span className="me-2">🎥</span> Video Tour
          </div>
        )}
      </div>

      <div style={{ aspectRatio: '16/9', width: '100%', display: activeTab === 'images' ? 'block' : 'none', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', transform: `translateX(-${currentSlide * 100}%)`, height: '100%' }}>
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`Slide ${idx}`} style={{ minWidth: '100%', height: '100%', objectFit: 'cover' }} />
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button onClick={prevSlide} className="position-absolute border-0 d-flex align-items-center justify-content-center hover-accent transition-all" style={{ top: '50%', transform: 'translateY(-50%)', left: '1.5rem', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(26,26,26,0.6)', backdropFilter: 'blur(10px)', color: 'var(--text-main)', zIndex: 5 }}>
              ❮
            </button>
            <button onClick={nextSlide} className="position-absolute border-0 d-flex align-items-center justify-content-center hover-accent transition-all" style={{ top: '50%', transform: 'translateY(-50%)', right: '1.5rem', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(26,26,26,0.6)', backdropFilter: 'blur(10px)', color: 'var(--text-main)', zIndex: 5 }}>
              ❯
            </button>
          </>
        )}
      </div>

      {hasVideo && (
        <div style={{ aspectRatio: '16/9', width: '100%', display: activeTab === 'video' ? 'block' : 'none' }}>
          {isYouTube ? (
            <iframe style={{ width: '100%', height: '100%', border: 0 }} src={video.replace('watch?v=', 'embed/')} allowFullScreen></iframe>
          ) : (
            <video style={{ width: '100%', height: '100%', objectFit: 'contain' }} controls>
              <source src={video} type="video/mp4" />
            </video>
          )}
        </div>
      )}
    </div>
  );
}
