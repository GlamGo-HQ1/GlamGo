import Image from 'next/image'
import styles from './StylistPortfolio.module.css'

interface StylistPortfolioProps {
  images: string[]
  stylistName: string
}

export function StylistPortfolio({ images, stylistName }: StylistPortfolioProps) {
  if (images.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.heading}>Portfolio</h2>
        </div>
        <div className={styles.empty}>
          <p>No portfolio images yet</p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>Portfolio</h2>
        <span className={styles.subLabel}>Selected Works</span>
      </div>
      <div className={styles.grid}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`${styles.imageCell} ${index % 2 === 1 ? styles.offset : ''}`}
          >
            <Image
              src={img}
              alt={`${stylistName} portfolio ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
