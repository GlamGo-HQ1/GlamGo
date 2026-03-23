import React from 'react'
import Link from 'next/link'
import { Container } from '../ui/Container'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>GlamGo</div>
            <p className={styles.desc}>
              The premium visual booking platform for discovering and booking top hair stylists near you.
            </p>
          </div>
          <div>
            <div className={styles.title}>Explore</div>
            <div className={styles.linkList}>
              <Link href="/gallery" className={styles.link}>Hairstyle Gallery</Link>
              <Link href="/stylists" className={styles.link}>Find Stylists</Link>
            </div>
          </div>
          <div>
            <div className={styles.title}>Company</div>
            <div className={styles.linkList}>
              <Link href="/auth/register" className={styles.link}>Join as Stylist</Link>
              <span className={styles.link}>Support</span>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>&copy; {new Date().getFullYear()} GlamGo. All rights reserved.</span>
          <span>Enyata x Interswitch Buildathon 2026</span>
        </div>
      </Container>
    </footer>
  )
}
