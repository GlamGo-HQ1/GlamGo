'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GalleryUploader } from './GalleryUploader'
import { deleteEvidenceImage } from '@/lib/actions/stylist-dashboard'
import styles from '@/app/dashboard/stylist/services/services.module.css'

interface EvidenceImage {
  src: string
  label: string
  date: string
}

interface EvidenceGalleryProps {
  initialImages: EvidenceImage[]
}

export function EvidenceGallery({ initialImages }: EvidenceGalleryProps) {
  const [images, setImages] = useState(initialImages)

  const handleDelete = (srcToRemove: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this evidence from your portfolio?")
    if (isConfirmed) {
      setImages((prev) => prev.filter((img) => img.src !== srcToRemove))
      deleteEvidenceImage(srcToRemove).catch(console.error)
    }
  }

  const handleUploadSuccess = (url: string) => {
    setImages(prev => [...prev, { src: url, label: 'New Upload', date: 'Just now' }])
  }

  return (
    <div className={styles.masonry}>
      {/* Upload dropzone (Client Component to trigger native file picker) */}
      <GalleryUploader onUploadSuccess={handleUploadSuccess} />

      {/* Gallery images */}
      {images.map((img) => (
        <div key={img.src} className={styles.galleryItem}>
          <Image
            src={img.src}
            alt={img.label}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.galleryImg}
          />
          <div className={styles.galleryOverlay}>
            <div>
              <p className={styles.galleryLabel}>{img.label}</p>
              <span className={styles.galleryDate}>{img.date}</span>
            </div>
            <button 
              className={styles.deleteBtn}
              onClick={() => handleDelete(img.src)}
              title="Delete evidence"
              aria-label="Delete evidence"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6L17.1 20.4a2 2 0 01-2 1.6H8.9a2 2 0 01-2-1.6L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
