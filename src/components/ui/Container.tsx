import React from 'react'
import styles from './Container.module.css'

export function Container({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>
}
