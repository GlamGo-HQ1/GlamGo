import styles from './styles-detail.module.css'

export default function StyleDetailLoading() {
  return (
    <div className={styles.page}>
      {/* Left: Image skeleton */}
      <div className={styles.imageColumn}>
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '50vh',
          background: 'linear-gradient(110deg, #1b1b20 8%, #252530 18%, #1b1b20 33%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
        }} />
      </div>

      {/* Right: Content skeleton */}
      <div className={styles.contentColumn}>
        {/* Back link skeleton */}
        <div style={{
          width: '120px', height: '14px', borderRadius: '4px',
          background: 'rgba(228,225,233,0.06)',
          marginBottom: '2rem',
        }} />

        {/* Title skeleton */}
        <div style={{
          width: '70%', height: '32px', borderRadius: '4px',
          background: 'rgba(228,225,233,0.06)',
          marginBottom: '1rem',
        }} />

        {/* Description skeletons */}
        <div style={{
          width: '100%', height: '16px', borderRadius: '4px',
          background: 'rgba(228,225,233,0.04)',
          marginBottom: '0.75rem',
        }} />
        <div style={{
          width: '85%', height: '16px', borderRadius: '4px',
          background: 'rgba(228,225,233,0.04)',
          marginBottom: '0.75rem',
        }} />
        <div style={{
          width: '60%', height: '16px', borderRadius: '4px',
          background: 'rgba(228,225,233,0.04)',
          marginBottom: '3rem',
        }} />

        {/* Price skeleton */}
        <div style={{
          width: '140px', height: '28px', borderRadius: '4px',
          background: 'rgba(230,196,135,0.08)',
          marginBottom: '3rem',
        }} />

        {/* Stylist cards skeleton */}
        <div style={{
          width: '50%', height: '18px', borderRadius: '4px',
          background: 'rgba(228,225,233,0.06)',
          marginBottom: '1.5rem',
        }} />
        {[1, 2].map((i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1rem',
            background: 'rgba(31,31,37,0.3)',
            borderRadius: '8px',
            marginBottom: '0.75rem',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(228,225,233,0.06)',
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{
                width: '60%', height: '14px', borderRadius: '4px',
                background: 'rgba(228,225,233,0.06)',
                marginBottom: '0.5rem',
              }} />
              <div style={{
                width: '40%', height: '12px', borderRadius: '4px',
                background: 'rgba(228,225,233,0.04)',
              }} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}
