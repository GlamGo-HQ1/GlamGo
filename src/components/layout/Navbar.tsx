import React from 'react'
import Link from 'next/link'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            GlamGo
          </Link>
          
          <div className={styles.navLinks}>
            <Link href="/gallery" className={styles.navItem}>Gallery</Link>
            {/* We'll handle auth state later in Phase 3 */}
            <Link href="/auth/login">
              <Button variant="secondary" style={{ padding: '8px 16px' }}>Log In</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="primary" style={{ padding: '8px 16px' }}>Sign Up</Button>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  )
}
