import { AuthForm } from '@/components/auth/AuthForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C2A878]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl relative z-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display text-white mb-2">Join GlamGo</h1>
          <p className="text-white/60">Unlock premium beauty services or list your expertise.</p>
        </div>

        <AuthForm view="register" />

        <p className="mt-8 text-sm text-white/50 text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#C2A878] hover:text-[#d3bc8f] transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
