'use client'

import { useState } from 'react'
import { RoleSelector } from './RoleSelector'
import { login, register } from '@/app/auth/actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function AuthForm({ view }: { view: 'login' | 'register' }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    // Call the corresponding server action directly
    const action = view === 'login' ? login : register
    const result = await action(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="w-full space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {view === 'register' && (
        <>
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/80">I am joining as a...</label>
            <RoleSelector onChange={() => {}} />
          </div>

          <Input 
            label="Full Name" 
            name="full_name" 
            placeholder="Jane Doe" 
            required 
          />
        </>
      )}

      <Input 
        label="Email Address" 
        type="email" 
        name="email" 
        placeholder="you@example.com" 
        required 
      />
      
      <Input 
        label="Password" 
        type="password" 
        name="password" 
        placeholder="••••••••" 
        required 
        minLength={6}
      />

      <Button 
        type="submit" 
        variant="primary" 
        className="w-full h-12 text-lg mt-4"
        disabled={loading}
      >
        {loading ? 'Please wait...' : (view === 'login' ? 'Sign In' : 'Create Account')}
      </Button>
    </form>
  )
}
