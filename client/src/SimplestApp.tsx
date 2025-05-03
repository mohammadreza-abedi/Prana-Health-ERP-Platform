import React, { useState, useEffect } from 'react';

function SimplestApp() {
  // State to track which buttons to show
  const [showFullControls, setShowFullControls] = useState(false);
  
  // Toggle full controls after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullControls(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#1e293b',
      color: 'white',
      flexDirection: 'column',
      padding: '1rem'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: '#334155',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
          پرانا - دستیار هوشمند سلامت
        </h1>
        <p style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>
          نسخه فوق‌العاده ساده برای عیب‌یابی
        </p>
        
        {!showFullControls ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ 
              height: '40px', 
              width: '40px', 
              borderRadius: '50%',
              border: '4px solid #0ea5e9',
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button 
              onClick={() => {
                localStorage.removeItem('prana_app_mode');
                window.location.reload();
              }}
              style={{
                padding: '0.75rem',
                backgroundColor: '#0ea5e9',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 'bold'
              }}
            >
              بازگشت به حالت عادی
            </button>
            
            <button 
              onClick={() => {
                localStorage.setItem('prana_app_mode', 'MINIMAL');
                window.location.reload();
              }}
              style={{
                padding: '0.75rem',
                backgroundColor: '#475569',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif'
              }}
            >
              بارگذاری نسخه ساده
            </button>
            
            <a 
              href="/minimal-mode.html"
              style={{
                padding: '0.75rem',
                backgroundColor: '#334155',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center'
              }}
            >
              صفحه تنظیم حالت ساده
            </a>
          </div>
        )}
        
        <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          حالت فعلی: {localStorage.getItem('prana_app_mode') || 'کامل'}
        </div>
        
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          button:hover, a:hover {
            opacity: 0.9;
            transform: translateY(-1px);
            transition: all 0.2s;
          }
        `}</style>
      </div>
    </div>
  );
}

export default SimplestApp;