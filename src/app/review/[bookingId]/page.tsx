'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from './review.module.css'

export default function ReviewPage() {
  const router = useRouter()
  const params = useParams()
  const bookingId = params.bookingId as string

  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) {
      alert('Please select a star rating.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, rating, comment: comment.trim() || undefined }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
        setTimeout(() => router.push('/dashboard/client'), 2000)
      } else {
        alert(data.error || 'Failed to submit review')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successIcon}>✨</div>
          <h1 className={styles.successTitle}>Review Submitted!</h1>
          <p className={styles.successSub}>Thank you for the feedback. Heading back to your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Rate Your Experience</h1>
          <p className={styles.subtitle}>How was your appointment? Your feedback helps other clients find great stylists.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Star Rating */}
          <div className={styles.starSection}>
            <p className={styles.starLabel}>Your Rating</p>
            <div className={styles.stars} role="group" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`${styles.star} ${(hovered || rating) >= star ? styles.starActive : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className={styles.ratingLabel}>
                {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className={styles.commentSection}>
            <label htmlFor="comment" className={styles.commentLabel}>
              Share more details <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              id="comment"
              className={styles.textarea}
              placeholder="What did you love? What could be better?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={4}
            />
            <p className={styles.charCount}>{comment.length}/500</p>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading || rating === 0}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>

          <button
            type="button"
            className={styles.skipBtn}
            onClick={() => router.push('/dashboard/client')}
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  )
}
