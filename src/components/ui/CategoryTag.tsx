import React from 'react'

interface CategoryTagProps {
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function CategoryTag({ label, isActive, onClick, className = '' }: CategoryTagProps) {
  return (
    <button 
      onClick={onClick}
      className={`pill ${isActive ? 'pill--active' : ''} ${className}`}
    >
      {label}
    </button>
  )
}
