'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './StyleImageGallery.module.css'

interface StyleImageGalleryProps {
  images: string[]
  styleName: string
}

export function StyleImageGallery({ images, styleName }: StyleImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className={styles.placeholder}>
        <p>No images available</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <Image
          src={images[activeIndex]}
          alt={`${styleName} - View ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
          style={{ objectFit: 'contain', objectPosition: 'center', backgroundColor: '#0A0A0F' }}
          priority
        />
        {/* Mobile title overlay now inside mainImage so it doesn't overlap thumbnails */}
        <div className={styles.mobileTitle}>
          <h1 className={styles.mobileTitleText}>{styleName}</h1>
        </div>
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <button
              key={index}
              title={`View ${index + 1}`}
              className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbActive : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={img}
                alt={`${styleName} - Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className={`${styles.thumbImage} ${index !== activeIndex ? styles.thumbInactive : ''}`}
                style={{ objectPosition: 'top center' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
