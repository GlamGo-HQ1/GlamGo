/* eslint-disable @next/next/no-img-element */
import styles from './GalleryPreview.module.css';

const EXHIBITS = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBLsZpaujGYZfIlXy3DTS_ARfKTqtRoBMiwUng_bkE0IMWL_aDfqWeMZr6aEkZOEZz6sx8DINnKqUt1k0ok2lV7g6hy0TTZUzpiFoLHoJHRqzUDPvDhJYj7qUIrYTJrF-v2vkZtILKTQClwEgkRRtnaY5_mEnq9VcbV0fsGxJxrqqr8SlRcBd2wGE4UHppJeFgj_qLD5VRNOOS0iGtetuVpG1_fwiSrY6dggKV_zSZ70x6oqhFWD60wtjca3qzotClPnhrSXm7O68',
    tag: 'Sculptural Form',
    name: 'The Obsidian Wave',
    brightness: '75',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrBwV-YmKzyWb2CueHJ4Zecm4XHuT9GsoW4umROSm1SoVLI_E-mRL-zOhjloQoI35qt6WqjPmNRcbC_vFPqPyP-exHJsZLsN-KbU1NkAoZBQkkSET-GyZtb6AOSj68KqBEGPVrzK9Aji4fGV6nTr41gdGpjFhbKnF6p3lEiaYMh5UKm8UiRN7VC8sDp0xCAcNk_9Aok_1JgyC7mDB5_LC6Fu2dDerTOnC3c99ENJSeL3Gbb8-cfJk9TrGv-WjyxstUugUW_SIk27E',
    tag: 'Textural Study',
    name: 'Lattice Platinum',
    brightness: '50',
    offset: true,
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN3OjsSEVxPfYAH54UQxPnRTnQMNXeCCFHMRBlH22caznTypWL5aocp9-Me6MrbOa5aNhTC1tfB1prioy28ui_TV3CyVfmr6tDNVokFjBZZc4FWwzGz7iDpVAUlLw8IvmVR8TJwSvkXqrNH6cEjItUO4AXPyRO8epb2lTU0SIMQdVNm9qjjIbOIhhRQZehOWgcj8He5HMkQKIlBagHzweLRdPN93xyaRU7EeskQ-7PWvOxCWDaIn07zs2W9laJAbQmx4oNpZSOIZY',
    tag: 'Minimalist Motion',
    name: 'Liquid Silk',
    brightness: '100',
  },
];

export const GalleryPreview = () => {
  return (
    <div className={`${styles.wrapper} spotlight-radial`}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.volumeTag}>Curated Volume I</span>
          <h2 className={styles.heading}>
            The <span className={styles.headingItalic}>Curator&apos;s</span><br />Choice
          </h2>
          <div className={styles.quoteCol}>
            <p className={styles.quote}>
              &quot;Style is not about following trends; it is about the structural integrity of one&apos;s own identity.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Exhibit Grid */}
      <section className={styles.exhibitSection}>
        <div className={styles.exhibitGrid}>
          {EXHIBITS.map((ex, i) => (
            <div key={i} className={`${styles.exhibit} ${ex.offset ? styles.exhibitOffset : ''}`}>
              <div className={styles.imgWrap}>
                <img
                  src={ex.img}
                  alt={ex.name}
                  className={styles.exhibitImg}
                  style={{ filter: `grayscale(1) brightness(${Number(ex.brightness) / 100})` }}
                />
                <div className={styles.imgFade} />
                <div className={styles.imgCard}>
                  <span className={styles.exhibitTag}>{ex.tag}</span>
                  <h3 className={styles.exhibitName}>{ex.name}</h3>
                </div>
              </div>
              <div className={styles.exhibitMeta}>
                <span />
                <span className={styles.exploreLink}>Explore Piece</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
