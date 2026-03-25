import Link from 'next/link';
import styles from './CommissionCTA.module.css';

export const CommissionCTA = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Commission Your Vision</h2>
        <p className={styles.body}>
          The exhibition is only the beginning. Connect with our master artists for a bespoke consultation that transcends the ordinary.
        </p>
        <Link href="/auth/register" className={styles.cta}>
          Begin Journey
        </Link>
      </div>
    </section>
  );
};
