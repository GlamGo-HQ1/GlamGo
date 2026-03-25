'use client'

import styles from './booking.module.css'

interface LocationInputProps {
  value: string
  onChange: (value: string) => void
  serviceType: 'salon' | 'home'
}

export function LocationInput({ value, onChange, serviceType }: LocationInputProps) {
  // Only show for home service
  if (serviceType === 'salon') {
    return null
  }

  return (
    <section className={styles.locationSection}>
      <h3 className={styles.sectionTitle}>Location</h3>
      
      {/* Input with icon */}
      <div className={styles.locationInputWrapper}>
        <LocationIcon />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your address"
          className={styles.locationInput}
        />
      </div>

      {/* Map Preview (placeholder for hackathon) */}
      <div className={styles.mapPreview}>
        <div className={styles.mapOverlay} />
        <div className={styles.mapPlaceholder}>
          {/* Static map placeholder - would be replaced with Google Maps */}
          <svg 
            viewBox="0 0 400 150" 
            fill="none" 
            className={styles.mapSvg}
          >
            {/* Grid pattern for map-like appearance */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(201,169,110,0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Roads */}
            <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(201,169,110,0.2)" strokeWidth="3" />
            <line x1="200" y1="0" x2="200" y2="150" stroke="rgba(201,169,110,0.2)" strokeWidth="3" />
            <line x1="50" y1="0" x2="350" y2="150" stroke="rgba(201,169,110,0.15)" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Pin marker */}
        <div className={styles.mapPin}>
          <LocationPinIcon />
        </div>
      </div>
    </section>
  )
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.locationIcon}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  )
}
