// src/components/CareVacayLogo.tsx
import React from 'react';

interface CareVacayLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function CareVacayLogo({ 
  className = '', 
  showText = true, 
  size = 'md' 
}: CareVacayLogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon - matches original design */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* House Shape - more rounded cottage style */}
          <path
            d="M30 70 Q30 25, 50 15 Q70 25, 70 70 Q70 75, 65 75 L35 75 Q30 75, 30 70 Z"
            fill="#77C7D3"
            stroke="#77C7D3"
            strokeWidth="1"
          />
          
          {/* House base - more rounded bottom */}
          <path
            d="M25 70 Q25 75, 30 80 L70 80 Q75 75, 75 70 L70 70 L30 70 Z"
            fill="#77C7D3"
          />
          
          {/* Heart - cream colored, centered in house */}
          <path
            d="M50 45 C50 45, 46 40, 42 40 C38 40, 38 45, 38 50 C38 55, 50 65, 50 65 C50 65, 62 55, 62 50 C62 45, 62 40, 58 40 C54 40, 50 45, 50 45 Z"
            fill="#F5F5DC"
          />
          
          {/* Water lines below house - gentle wavy lines */}
          <path
            d="M20 80 Q30 75, 40 80 T60 80 T80 80"
            stroke="#77C7D3"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M15 85 Q25 80, 35 85 T55 85 T75 85 T85 85"
            stroke="#77C7D3"
            strokeWidth="2.5"
            fill="none"
          />
          
          {/* Sun - orange semi-circle above and to the right */}
          <path
            d="M75 15 A10 10 0 0 1 75 35 L75 15 Z"
            fill="#F9A646"
          />
          <circle
            cx="75"
            cy="25"
            r="10"
            fill="#F9A646"
          />
        </svg>
      </div>

      {/* Logo Text - serif font, stacked vertically */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-bold text-primary-500 ${textSizeClasses[size]} leading-tight`}>
            Care
          </span>
          <span className={`font-serif font-bold text-primary-500 ${textSizeClasses[size]} leading-tight`}>
            Vacay
          </span>
        </div>
      )}
    </div>
  );
}
