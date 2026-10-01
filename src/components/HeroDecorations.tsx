import React from 'react';

export const FloatingWireframePrism: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* 3D Wireframe Tetrahedron / Prism from screenshot 1.PNG */}
      <svg
        width="110"
        height="110"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md animate-[bounce_6s_ease-in-out_infinite]"
      >
        {/* Glow backdrop */}
        <polygon
          points="25,95 65,15 105,80"
          fill="#3b82f6"
          fillOpacity="0.8"
        />
        {/* Shaded facet */}
        <polygon
          points="25,95 65,15 50,105"
          fill="#1d4ed8"
          fillOpacity="0.4"
        />
        {/* Wireframe outer edges */}
        <line x1="25" y1="95" x2="65" y2="15" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="65" y1="15" x2="105" y2="80" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="105" y1="80" x2="25" y2="95" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
        
        {/* Internal wireframe perspective line */}
        <line x1="65" y1="15" x2="50" y2="105" stroke="#111827" strokeWidth="2.5" />
        <line x1="25" y1="95" x2="50" y2="105" stroke="#111827" strokeWidth="2.5" />
        <line x1="105" y1="80" x2="50" y2="105" stroke="#111827" strokeWidth="2.5" strokeDasharray="3 3" />
      </svg>
    </div>
  );
};

export const FloatingBlueTorus: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* 3D Glossy Blue Torus Ring from screenshot 1.PNG */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg animate-[pulse_4s_ease-in-out_infinite]"
      >
        <defs>
          <radialGradient id="torusGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="90%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <filter id="torusShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="6" stdDeviation="4" floodColor="#1e3a8a" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Torus body with dark outline & glossy gradient */}
        <path
          d="M 50 15 
             C 75 15, 90 32, 90 55 
             C 90 75, 75 90, 50 90 
             C 25 90, 10 75, 10 55 
             C 10 32, 25 15, 50 15 Z 
             M 50 35 
             C 38 35, 30 45, 30 55 
             C 30 65, 38 72, 50 72 
             C 62 72, 70 65, 70 55 
             C 70 45, 62 35, 50 35 Z"
          fill="url(#torusGrad)"
          stroke="#0f172a"
          strokeWidth="3.5"
          filter="url(#torusShadow)"
          fillRule="evenodd"
          transform="rotate(25 50 50)"
        />
        
        {/* Specular highlight crescent */}
        <path
          d="M 38 28 C 45 22, 58 22, 65 26"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};
