'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { claimHairstyle, removeClaimedHairstyle } from '@/lib/actions/stylist-dashboard'
import type { GlobalHairstyle } from '@/lib/actions/stylist-dashboard'
import styles from './ServiceClaimGrid.module.css'

/* ─── Category filter config ─── */
const TABS = [
  { label: 'Trending', value: 'trending' },
  { label: 'All', value: 'all' },
  { label: 'Braids', value: 'braids' },
  { label: 'Cornrows', value: 'cornrows' },
  { label: 'Locs', value: 'locs' },
  { label: 'Twists', value: 'twists' },
]

// Trending = first 4 hairstyles across all categories (most recently added)
const TRENDING_IDS = [
  '6918b7de-fb7c-4b65-9f22-016aa612476b', // Fulani Braids
  '876692b9-1133-4ece-b074-b3a759cab920', // Knotless Braids
  'c9e936d9-8792-4481-a5ec-8f90d2ee5d45', // Boho Locs
  '6fc31b71-f897-4d47-abb9-b7b85bb2558e', // Jumbo Marley Twist
  '4f7d745e-a7ac-480e-91e1-6f6e592788cd', // Tyla Braids
  '20512339-cc0d-43af-8275-f2ddee9e9d95', // Knotless with Curls
]

interface Props {
  hairstyles: GlobalHairstyle[]
  claimedIds: string[]
  stylistProfileId: string
}

interface ClaimState {
  [hairstyleId: string]: 'idle' | 'pricing' | 'saving' | 'claimed'
}

export function ServiceClaimGrid({ hairstyles, claimedIds, stylistProfileId }: Props) {
  const [activeTab, setActiveTab] = useState('trending')
  const [claimState, setClaimState] = useState<ClaimState>(() => {
    const initial: ClaimState = {}
    hairstyles.forEach((h) => {
      initial[h.id] = claimedIds.includes(h.id) ? 'claimed' : 'idle'
    })
    return initial
  })
  const [prices, setPrices] = useState<Record<string, string>>({})
  const [, startTransition] = useTransition()

  const filteredHairstyles = hairstyles.filter((h) => {
    if (activeTab === 'trending') return TRENDING_IDS.includes(h.id)
    if (activeTab === 'all') return true
    return h.category.toLowerCase() === activeTab
  })

  function handleICanDoThis(hairstyleId: string) {
    setClaimState((prev) => ({ ...prev, [hairstyleId]: 'pricing' }))
  }

  function handleRemove(hairstyleId: string) {
    startTransition(async () => {
      setClaimState((prev) => ({ ...prev, [hairstyleId]: 'saving' }))
      await removeClaimedHairstyle(stylistProfileId, hairstyleId)
      setClaimState((prev) => ({ ...prev, [hairstyleId]: 'idle' }))
    })
  }

  function handleSave(hairstyleId: string) {
    const rawPrice = prices[hairstyleId] ?? ''
    const price = parseInt(rawPrice.replace(/[^0-9]/g, ''), 10)
    if (!price || price < 1000) return

    startTransition(async () => {
      setClaimState((prev) => ({ ...prev, [hairstyleId]: 'saving' }))
      const result = await claimHairstyle(stylistProfileId, hairstyleId, price)
      if (result.error) {
        setClaimState((prev) => ({ ...prev, [hairstyleId]: 'pricing' }))
      } else {
        setClaimState((prev) => ({ ...prev, [hairstyleId]: 'claimed' }))
      }
    })
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.tab} ${activeTab === tab.value ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filteredHairstyles.length === 0 && (
          <p className={styles.empty}>No styles in this category yet.</p>
        )}

        {filteredHairstyles.map((hairstyle) => {
          const state = claimState[hairstyle.id] ?? 'idle'
          const imgSrc = hairstyle.images?.[0] ?? null

          return (
            <div key={hairstyle.id} className={`${styles.card} ${state === 'claimed' ? styles.cardClaimed : ''}`}>
              {/* Image */}
              <div className={styles.cardImage}>
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={hairstyle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className={styles.cardImg}
                  />
                ) : (
                  <div className={styles.cardImgPlaceholder} />
                )}

                {activeTab === 'trending' && (
                  <span className={styles.trendingBadge}>Trending Now</span>
                )}

                {state === 'claimed' && (
                  <span className={styles.claimedBadge}>✓ Claimed</span>
                )}
              </div>

              {/* Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{hairstyle.name}</h3>
                <p className={styles.cardCategory}>{hairstyle.category}</p>

                <div className={styles.cardAction}>
                  {state === 'idle' && (
                    <button
                      className={styles.claimBtn}
                      onClick={() => handleICanDoThis(hairstyle.id)}
                    >
                      I can do this
                    </button>
                  )}

                  {state === 'pricing' && (
                    <div className={styles.pricingPanel}>
                      <div className={styles.priceInput}>
                        <span className={styles.currency}>₦</span>
                        <input
                          type="text"
                          className={styles.priceField}
                          placeholder="e.g. 45000"
                          value={prices[hairstyle.id] ?? ''}
                          onChange={(e) =>
                            setPrices((prev) => ({ ...prev, [hairstyle.id]: e.target.value }))
                          }
                        />
                      </div>
                      <button
                        className={styles.saveBtn}
                        onClick={() => handleSave(hairstyle.id)}
                      >
                        Save Expertise
                      </button>
                    </div>
                  )}

                  {state === 'saving' && (
                    <p className={styles.savingText}>Saving...</p>
                  )}

                  {state === 'claimed' && (
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(hairstyle.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
