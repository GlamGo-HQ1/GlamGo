import type { ReviewWithClient } from '@/lib/actions/stylists'
import styles from './StylistReviews.module.css'

interface StylistReviewsProps {
  reviews: ReviewWithClient[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function StylistReviews({ reviews }: StylistReviewsProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Client Testimonials</h2>
      {reviews.length === 0 ? (
        <p className={styles.empty}>No reviews yet. Be the first!</p>
      ) : (
        <div className={styles.list}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h5 className={styles.clientName}>{review.client_name}</h5>
                  <p className={styles.date}>{formatDate(review.created_at)}</p>
                </div>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={i <= review.rating ? 'var(--accent-primary)' : 'none'}
                      stroke="var(--accent-primary)"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className={styles.comment}>&quot;{review.comment}&quot;</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
