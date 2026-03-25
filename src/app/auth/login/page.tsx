import Link from 'next/link'
import { AuthForm } from '@/components/auth/AuthForm'
import styles from '../auth.module.css'

export const metadata = {
  title: 'Sign In | GlamGo',
  description: 'Sign in to your GlamGo account to manage appointments and discover stylists.',
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshGradient} />
      <div className={styles.glassPanel}>
        <span className={styles.brand}>GlamGo</span>
        <h1 className={styles.heading}>Welcome Back</h1>
        <p className={styles.subheading}>Enter the Digital Atelier</p>
        <AuthForm view="login" />
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don&apos;t have an account?
            <Link href="/auth/register" className={styles.footerLink}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
