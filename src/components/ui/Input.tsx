import React, { forwardRef } from 'react'
import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input 
          ref={ref}
          className={`input ${className || ''}`} 
          style={error ? { borderColor: 'var(--error)' } : undefined}
          {...props} 
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    )
  }
)
Input.displayName = 'Input'
