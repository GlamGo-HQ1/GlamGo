import Image from 'next/image';
import styles from './EditorialGrid.module.css';

const GRID_IMAGES = [
  '/images/hairstyles/Twists/Island twist braids/front.jpg', // Left Tall (Island Twist Braids)
  '/images/hairstyles/Locs (Dreads & Faux Locs)/Boho Locs/_Based_on_the_202603261239.jpg', // Left Short (Side Profile Locs)
  '/images/hairstyles/Weaving (Cornrows & Stitch Styles)/Classic Shukwu/front.jpg', // Center Large
  '/images/hairstyles/Twists/Island twist braids/_Based_on_the_202603261608.png', // Center Bottom
  '/images/hairstyles/Braids/Lemonade Braids/front.jpg', // Right Top
  '/images/hairstyles/Weaving (Cornrows & Stitch Styles)/shukwu with Bond/front.jpg', // Right Mid
  '/images/hairstyles/Weaving (Cornrows & Stitch Styles)/Bald Braids/front.jpg', // Right Bottom
];

const GridImage = ({ src, alt }: { src: string, alt: string }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
    <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
  </div>
);

export const EditorialGrid = () => {
  return (
    <section className={styles.section} id="editorial-grid">
      <div className={styles.grid}>
        {/* LEFT COLUMN */}
        <div className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxTall}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <GridImage src={GRID_IMAGES[0]} alt="Doll Braids Front View" />
            <div className={styles.diagLine} style={{ zIndex: 10 }} />
          </div>
          <div className={`editorial-grid-box ${styles.boxShort}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <GridImage src={GRID_IMAGES[1]} alt="Butterfly Locs Top View" />
            <div className={styles.goldBar} style={{ zIndex: 10 }} />
          </div>
        </div>

        {/* CENTER COLUMN — Focal Point */}
        <div className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxCenter}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <GridImage src={GRID_IMAGES[2]} alt="Classic Shukwu Back View" />
            <span className={styles.viewLabel} style={{ zIndex: 10 }}>MULTIPLE ANGLES</span>
            <div className={styles.navBtns} style={{ zIndex: 10 }}>
              <button className={styles.arrowBtn} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <button className={styles.arrowBtn} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <span className={styles.counter} style={{ zIndex: 10 }}>7 PERSPECTIVES</span>
            <div className={styles.crossLines} style={{ zIndex: 10 }}>
              <div className={styles.crossLine1} />
              <div className={styles.crossLine2} />
            </div>
          </div>
          <div className={`editorial-grid-box ${styles.boxBottom}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <GridImage src={GRID_IMAGES[3]} alt="Zig Zag Braids Side View" />
            <div className={styles.gradientLine} style={{ zIndex: 10 }} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxSmall}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <GridImage src={GRID_IMAGES[4]} alt="Lemonade Braids Side View" />
            <span className={styles.refLabel} style={{ zIndex: 10 }}>REF. 001</span>
          </div>
          <div className={`editorial-grid-box ${styles.boxSmall}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <GridImage src={GRID_IMAGES[5]} alt="Shukwu With Bond Front View" />
            <div className={styles.circleDecor} style={{ zIndex: 10 }} />
          </div>
          <div className={`editorial-grid-box ${styles.boxSmall}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <GridImage src={GRID_IMAGES[6]} alt="Bald Braids Back Form" />
            <div className={styles.bottomFade} style={{ zIndex: 10 }} />
          </div>
        </div>
      </div>
    </section>
  );
};
