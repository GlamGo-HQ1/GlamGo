'use client'

import { useState } from 'react'
import { RoleSelector } from './RoleSelector'
import { login, register } from '@/app/auth/actions'
import styles from '../../app/auth/auth.module.css'

export function AuthForm({ view }: { view: 'login' | 'register' }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder="+234 801 234 5678"
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
        <div className={styles.passwordInputWrapper}>
          <input
            className={styles.passwordInput}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            required
            minLength={6}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
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
