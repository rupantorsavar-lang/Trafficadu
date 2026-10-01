import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const TrafficaduLogo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Precision Vector Emblem matching Trafficadu stylized T polygon */}
      <svg
        className={`${iconSizes[size]} shrink-0`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal top bar of T - bright cyan/blue facet */}
        <path
          d="M6 8H34L28 17H6V8Z"
          fill="#0091FF"
        />
        {/* Left angle accent */}
        <path
          d="M6 8L16 23H6V8Z"
          fill="#0070E0"
        />
        {/* Vertical stem of T - isometric prism shadow */}
        <path
          d="M16 17H26L18 34H11L16 17Z"
          fill="#0052B4"
        />
        {/* Subtle highlight gradient overlay */}
        <path
          d="M6 8L28 8L22 17L6 17Z"
          fill="url(#logo_grad)"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="logo_grad" x1="6" y1="8" x2="28" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {!iconOnly && (
        <span
          className={`font-black tracking-tight uppercase leading-none font-display ${textSizes[size]}`}
          style={{ letterSpacing: '0.02em' }}
        >
          <span className="text-[#0c1524]">TRAFFIC</span>
          <span className="text-[#0084ff]">ADU</span>
        </span>
      )}
    </div>
  );
};
