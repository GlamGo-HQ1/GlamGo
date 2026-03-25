'use client'

import { useState } from 'react'
import { RoleSelector } from './RoleSelector'
import { login, register } from '@/app/auth/actions'
import styles from '../../app/auth/auth.module.css'

export function AuthForm({ view }: { view: 'login' | 'register' }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const action = view === 'login' ? login : register
    const result = await action(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {view === 'register' && (
        <>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>I am joining as a...</label>
            <RoleSelector onChange={() => {}} />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              className={styles.input}
              name="full_name"
              placeholder="Alexandra Vogue"
              required
            />
          </div>
        </>
      )}

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Email Address</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="vogue@atelier.com"
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.passwordHeader}>
          <label className={styles.label}>Password</label>
          {view === 'login' && (
            <span className={styles.forgotLink}>Forgot?</span>
          )}
        </div>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="••••••••"
          required
          minLength={6}
        />
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={loading}
      >
        {loading ? 'Please wait...' : (view === 'login' ? 'Sign In' : 'Create Account')}
      </button>
    </form>
  )
}
