import styles from './StoryReveal.module.css';

export const StoryReveal = () => {
  return (
    <section className={styles.story}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Every Crown</h2>
        <h2 className={styles.titleGold}>Has a Story</h2>
        <div className={styles.gap} />
        <p className={styles.body}>
          We don&apos;t just show you hairstyles. We show you every angle, every
          detail — so you know exactly what you&apos;re choosing before you book.
        </p>
      </div>
    </section>
  );
};
