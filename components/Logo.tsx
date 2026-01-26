import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", variant = 'color', showText = true }) => {
  // Brand Identity Colors
  const brandGreen = '#05A446';
  const brandYellow = '#FFE94C';
  const white = '#FFFFFF';
  const brandDark = '#024321'; // Deep Green

  // Configure dynamic colors based on variant
  // If variant is 'light', it means the logo is on a dark background -> Primary White, Accent Yellow
  // If variant is 'color', it means the logo is on a light background -> Primary Green, Accent Yellow
  const primaryFill = variant === 'light' ? white : brandGreen;
  const accentFill = brandYellow; 
  const textFill = variant === 'light' ? white : brandDark;

  return (
    <div className={`flex items-center gap-2.5 ${className} select-none group`}>
      <svg viewBox="0 0 100 100" className="h-full w-auto aspect-square overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
         {/* Abstract Human Figure in Motion */}
         
         {/* Head: The "Intelligence" (Dot) */}
         <circle cx="70" cy="25" r="11" fill={accentFill} />
         
         {/* Body: The "Motion" (Dynamic Swoosh) */}
         {/* Represents a runner or person moving forward, spine curving into leg */}
         <path 
           d="M 30 90 C 40 80, 55 50, 65 45 C 75 40, 85 45, 92 50" 
           stroke={primaryFill} 
           strokeWidth="14" 
           strokeLinecap="round"
           strokeLinejoin="round"
           className="transition-all duration-500 ease-out"
         />
         
         {/* Arm/Balance: The "System" (Connecting Stroke) */}
         {/* Represents balance and forward reach */}
         <path 
           d="M 45 55 C 40 55, 25 45, 15 35" 
           stroke={primaryFill} 
           strokeWidth="14" 
           strokeLinecap="round"
           strokeLinejoin="round"
           className="transition-all duration-500 ease-out"
         />
      </svg>
      
      {showText && (
          <div className="flex flex-col justify-center leading-none">
            <span 
                className="font-bold text-2xl tracking-tight" 
                style={{ color: textFill, fontFamily: 'Inter, sans-serif' }}
            >
                Iṣẹ́yáá
            </span>
            {/* Optional Tagline for larger variants could go here, but keeping it clean for logo component */}
          </div>
      )}
    </div>
  );
};