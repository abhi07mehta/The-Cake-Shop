import React from "react";

const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--background)',
      gap: '2rem',
    }}>
      {/* Animated cake loader */}
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <div style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '4px solid var(--border-light)',
          borderTopColor: 'var(--primary)',
          animation: 'loader-spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.8rem',
          animation: 'loader-pulse 1.5s ease-in-out infinite',
        }}>
          🎂
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.2rem',
          color: 'var(--text-main)',
          marginBottom: '0.25rem',
          fontWeight: 600,
        }}>
          The Cake Shop
        </p>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Loading...
        </p>
      </div>

      <style>{`
        @keyframes loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loader-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
