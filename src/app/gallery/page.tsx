export default function GalleryPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-secondary)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-display), serif', 
          fontSize: '3rem',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          Gallery Coming Soon
        </h1>
        <p>Explore every hairstyle from every angle.</p>
      </div>
    </div>
  );
}
