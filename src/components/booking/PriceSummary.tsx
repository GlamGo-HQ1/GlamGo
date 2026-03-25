'use client'

import styles from './booking.module.css'

interface PriceSummaryProps {
  servicePrice: number
  bookingFee?: number
  onProceed: () => void
  isValid: boolean
  isLoading?: boolean
}

export function PriceSummary({ 
  servicePrice, 
  bookingFee = 500, 
  onProceed, 
  isValid,
  isLoading = false 
}: PriceSummaryProps) {
  const total = servicePrice + bookingFee

  return (
    <section className={styles.priceSummary}>
      {/* Price breakdown */}
      <div className={styles.priceRows}>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Service price</span>
          <span className={styles.priceValue}>₦{servicePrice.toLocaleString()}</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Booking fee</span>
          <span className={styles.priceValue}>₦{bookingFee.toLocaleString()}</span>
        </div>
      </div>

      {/* Separator */}
      <div className={styles.priceDivider} />

      {/* Total */}
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>₦{total.toLocaleString()}</span>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onProceed}
        disabled={!isValid || isLoading}
        className={styles.proceedButton}
      >
        {isLoading ? 'Processing...' : 'Proceed to Payment'}
      </button>

      {/* Security note */}
      <p className={styles.securityNote}>
        Secure checkout encrypted with 256-bit SSL
      </p>
    </section>
  )
}
