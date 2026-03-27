'use client'

import { useRef, useState } from 'react'
import { uploadEvidenceImage } from '@/lib/actions/stylist-dashboard'
import styles from '@/app/dashboard/stylist/services/services.module.css'

interface Props {
  onUploadSuccess?: (url: string) => void
}

export function GalleryUploader({ onUploadSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const { error, url } = await uploadEvidenceImage(formData)
      
      if (error) {
        alert(error)
      } else if (url && onUploadSuccess) {
        onUploadSuccess(url)
      }
    } catch (err) {
      alert('Upload failed: ' + String(err))
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div 
      className={`${styles.uploadZone} ${isUploading ? styles.uploadZoneUploading : ''}`}
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input
        type="file"
        title="Upload evidence file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, video/mp4"
        style={{ display: 'none' }}
      />
      
      {isUploading ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner} />
          <span className={styles.uploadLabel}>Processing...</span>
        </div>
      ) : (
        <>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <span className={styles.uploadLabel}>Upload New Evidence</span>
          <span className={styles.uploadHint}>JPG or MP4 (Max 50MB)</span>
        </>
      )}
    </div>
  )
}
