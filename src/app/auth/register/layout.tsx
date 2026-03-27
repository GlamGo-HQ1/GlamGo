import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join GlamGo | Digital Atelier',
  description: 'Create your GlamGo account — join as a client or stylist.',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
