import styles from './EditorialGrid.module.css';

export const EditorialGrid = () => {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {/* LEFT COLUMN */}
        <div className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxTall}`}>
            <div className={styles.diagLine} />
          </div>
          <div className={`editorial-grid-box ${styles.boxShort}`}>
            <div className={styles.goldBar} />
          </div>
        </div>

        {/* CENTER COLUMN — Focal Point */}
        <div className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxCenter}`}>
            <span className={styles.viewLabel}>FRONT VIEW</span>
            <div className={styles.navBtns}>
              <button className={styles.arrowBtn} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <button className={styles.arrowBtn} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <span className={styles.counter}>1 / 6</span>
            {/* Decorative cross-lines */}
            <div className={styles.crossLines}>
              <div className={styles.crossLine1} />
              <div className={styles.crossLine2} />
            </div>
          </div>
          <div className={`editorial-grid-box ${styles.boxBottom}`}>
            <div className={styles.gradientLine} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxSmall}`}>
            <span className={styles.refLabel}>REF. 001</span>
          </div>
          <div className={`editorial-grid-box ${styles.boxSmall}`}>
            <div className={styles.circleDecor} />
          </div>
          <div className={`editorial-grid-box ${styles.boxSmall}`}>
            <div className={styles.bottomFade} />
          </div>
        </div>
      </div>
    </section>
  );
};
