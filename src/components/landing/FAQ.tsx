'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

const FAQ_DATA = [
  {
    q: 'How do I book a hairstylist on GlamGo?',
    a: 'Browse our curated gallery, select a hairstyle you love, choose an available stylist, pick your date and time, and confirm your booking. You can pay securely online or at the salon.'
  },
  {
    q: 'Can a stylist come to my location?',
    a: 'Yes! Many of our stylists offer mobile services. When booking, simply toggle to "Home Service," enter your address, and a mobile-ready stylist will come to you.'
  },
  {
    q: 'How are stylists verified on the platform?',
    a: 'Every GlamGo stylist goes through a portfolio review and identity verification process. We only onboard professionals whose work meets our editorial quality standards.'
  },
  {
    q: 'What if I need to reschedule or cancel?',
    a: 'You can reschedule or cancel from your dashboard up to 24 hours before your appointment at no charge. Late cancellations may attract a small fee to compensate the stylist.'
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept bank transfers, debit cards, and USSD payments powered by Interswitch. All transactions are secured with bank-level encryption.'
  },
  {
    q: 'Is my personal data safe?',
    a: 'Absolutely. GlamGo uses Supabase Row-Level Security (RLS) to ensure your data is only visible to you. We never share your information with third parties.'
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Support</p>
        <h2 className={styles.heading}>Frequently Asked Questions</h2>

        <div className={styles.list}>
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${openIndex === i ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i ? 'true' : 'false'}
              >
                <span>{item.q}</span>
                <svg
                  className={styles.chevron}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={styles.answerWrap}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
