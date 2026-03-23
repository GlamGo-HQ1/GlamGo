import React from 'react'
import Link from 'next/link'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './Navbar.module.css'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/actions'

export async function Navbar() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            GlamGo
          </Link>
          
          <div className={styles.navLinks}>
            <Link href="/gallery" className={styles.navItem}>Gallery</Link>
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="secondary" style={{ padding: '8px 16px' }}>Dashboard</Button>
                </Link>
                <form action={logout}>
                  <Button type="submit" variant="primary" style={{ padding: '8px 16px' }}>Sign Out</Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="secondary" style={{ padding: '8px 16px' }}>Log In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" style={{ padding: '8px 16px' }}>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}
