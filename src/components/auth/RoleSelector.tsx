'use client'

import { useState } from 'react'

export function RoleSelector({ onChange }: { onChange: (role: 'client' | 'stylist') => void }) {
  const [role, setRole] = useState<'client' | 'stylist'>('client')

  const selectRole = (newRole: 'client' | 'stylist') => {
    setRole(newRole)
    onChange(newRole)
  }

  return (
    <div className="flex gap-4 w-full">
      <button
        type="button"
        onClick={() => selectRole('client')}
        className={`flex-1 py-4 px-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
          role === 'client' 
            ? 'border-[#C2A878] bg-[#C2A878]/10 text-white shadow-[0_0_15px_rgba(194,168,120,0.15)]' 
            : 'border-white/10 text-white/60 hover:border-white/20 hover:bg-white/5'
        }`}
      >
        <span className="text-xl">✨</span>
        <span className="font-medium">I&apos;m a Client</span>
        <span className="text-xs text-center opacity-70">I want to book hair appointments</span>
      </button>

      <button
        type="button"
        onClick={() => selectRole('stylist')}
        className={`flex-1 py-4 px-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
          role === 'stylist' 
            ? 'border-[#C2A878] bg-[#C2A878]/10 text-white shadow-[0_0_15px_rgba(194,168,120,0.15)]' 
            : 'border-white/10 text-white/60 hover:border-white/20 hover:bg-white/5'
        }`}
      >
        <span className="text-xl">✂️</span>
        <span className="font-medium">I&apos;m a Stylist</span>
        <span className="text-xs text-center opacity-70">I want to list my services</span>
      </button>
      
      {/* Hidden input to pass role value with FormData */}
      <input type="hidden" name="role" value={role} />
    </div>
  )
}
