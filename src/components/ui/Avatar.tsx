import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: number
}

export function Avatar({ src, alt, size = 48 }: AvatarProps) {
  const fallback = 'https://ui-avatars.com/api/?background=141419&color=F5F0EB&name=' + encodeURIComponent(alt || 'User')
  
  return (
    <div style={{ 
      width: size, 
      height: size, 
      borderRadius: 'var(--radius-full)', 
      overflow: 'hidden', 
      position: 'relative',
      backgroundColor: 'var(--bg-surface)'
    }}>
      <Image 
        src={src || fallback}
        alt={alt || 'Avatar'}
        fill
        sizes={`${size}px`}
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
