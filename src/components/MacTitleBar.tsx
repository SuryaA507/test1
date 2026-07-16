import React from 'react';

interface MacTitleBarProps {
  title: string;
  subtitle?: string;
}

export const MacTitleBar: React.FC<MacTitleBarProps> = ({ title, subtitle }) => {
  return (
    <div 
      className="mac-titlebar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        borderBottom: '1px solid rgba(200, 192, 175, 0.25)',
        background: 'rgba(255, 255, 255, 0.2)',
        borderTopLeftRadius: '28px',
        borderTopRightRadius: '28px',
        userSelect: 'none'
      }}
    >
      {/* Red, Yellow, Green Window Dots */}
      <div className="mac-dots" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--mac-red)', opacity: 0.9 }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--mac-yellow)', opacity: 0.9 }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--mac-green)', opacity: 0.9 }}></div>
      </div>
      
      {/* Title */}
      <div className="mac-title-container" style={{ textAlign: 'center', flex: 1, paddingRight: '40px' }}>
        <h1 style={{ 
          fontSize: '0.85rem', 
          fontWeight: 700, 
          letterSpacing: '0.8px', 
          color: 'var(--beige-primary)',
          margin: 0,
          textTransform: 'uppercase'
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '2px 0 0 0', fontWeight: 500 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Connection Indicator Status */}
      <div 
        className="mac-status"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--beige-light)',
          border: '1px solid rgba(200, 192, 175, 0.35)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.7rem',
          color: 'var(--beige-primary)',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}
      >
        <span 
          style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            backgroundColor: '#27c93f', 
            boxShadow: '0 0 6px #27c93f',
            display: 'inline-block' 
          }}
        ></span>
        RAG ACTIVE
      </div>
    </div>
  );
};
export default MacTitleBar;
