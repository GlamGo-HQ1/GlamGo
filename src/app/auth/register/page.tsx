import Link from 'next/link'
import { AuthForm } from '@/components/auth/AuthForm'
import styles from '../auth.module.css'

export const metadata = {
  title: 'Join GlamGo | Digital Atelier',
  description: 'Create your GlamGo account — join as a client or stylist.',
}

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshGradient} />
      <div className={styles.glassPanel}>
        <span className={styles.brand}>GlamGo</span>
        <h1 className={styles.heading}>Join GlamGo</h1>
        <p className={styles.subheading}>Begin your aesthetic journey</p>
        <AuthForm view="register" />
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already a member?
            <Link href="/auth/login" className={styles.footerLink}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
