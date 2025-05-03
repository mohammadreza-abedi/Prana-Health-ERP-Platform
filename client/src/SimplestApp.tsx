import React from 'react';

function SimplestApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#1e293b',
      color: 'white'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: '#334155',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
          پرانا - دستیار هوشمند سلامت
        </h1>
        <p style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>
          سیستم در حال بازیابی و آماده‌سازی است. لطفا شکیبا باشید.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            height: '40px', 
            width: '40px', 
            borderRadius: '50%',
            border: '4px solid #2dd4bf',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default SimplestApp;