import React from 'react';

interface RefahLogoProps {
  className?: string;
  variant?: 'full' | 'emblem';
  textColor?: string;
}

export const RefahLogo: React.FC<RefahLogoProps> = ({
  className = 'h-12 w-auto',
  variant = 'full',
  textColor = '#023D6B',
}) => {
  if (variant === 'emblem') {
    return (
      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Refah Sanat Pardis Emblem"
      >
        {/* Top Blue Chevron */}
        <path
          d="M 150,22 L 198,70 L 180,70 L 150,42 L 120,70 L 102,70 Z"
          fill="#023D6B"
        />

        {/* Bottom Blue Chevron */}
        <path
          d="M 150,278 L 198,230 L 180,230 L 150,258 L 120,230 L 102,230 Z"
          fill="#023D6B"
        />

        {/* Left Grey Chevron */}
        <path
          d="M 22,150 L 70,102 L 70,120 L 42,150 L 70,180 L 70,198 Z"
          fill="#7C8793"
        />

        {/* Right Grey Chevron */}
        <path
          d="M 278,150 L 230,102 L 230,120 L 258,150 L 230,180 L 230,198 Z"
          fill="#7C8793"
        />

        {/* Central Dark Blue Square */}
        <rect x="74" y="74" width="152" height="152" fill="#023D6B" rx="1" />

        {/* UPPER SECTION: White Gear with Inner Symbol */}
        <g transform="translate(150, 126)">
          <g fill="#FFFFFF">
            <rect x="-5" y="-44" width="10" height="9" rx="1" />
            <rect x="-5" y="35" width="10" height="9" rx="1" />
            <rect x="-44" y="-5" width="9" height="10" rx="1" />
            <rect x="35" y="-5" width="9" height="10" rx="1" />

            <rect x="-5" y="-44" width="10" height="9" rx="1" transform="rotate(45)" />
            <rect x="-5" y="-44" width="10" height="9" rx="1" transform="rotate(135)" />
            <rect x="-5" y="-44" width="10" height="9" rx="1" transform="rotate(225)" />
            <rect x="-5" y="-44" width="10" height="9" rx="1" transform="rotate(315)" />

            <circle cx="0" cy="0" r="37" />
          </g>

          <circle cx="0" cy="0" r="25" fill="#023D6B" />

          <g fill="#FFFFFF" transform="scale(0.8)">
            <path d="M -11,-9 L 3,-9 C 9,-9 13,-5 13,0 C 13,5 9,9 3,9 L -4,9 L -4,3 L 3,3 C 5,3 7,1 7,0 C 7,-1 5,-3 3,-3 L -11,-3 Z" />
            <path d="M 11,9 L -3,9 C -9,9 -13,5 -13,0 C -13,-5 -9,-9 -3,-9 L 4,-9 L 4,-3 L -3,-3 C -5,-3 -7,-1 -7,0 C -7,1 -5,3 -3,3 L 11,3 Z" />
            <polygon points="0,-15 5,-9 -5,-9" />
            <polygon points="0,15 5,9 -5,9" />
          </g>
        </g>

        {/* LOWER SECTION: Two Isometric Stacks of Ingots / Sheets */}
        <g transform="translate(150, 182)">
          <g transform="translate(-30, 0)">
            <polygon points="-26,-12 0,-21 26,-12 0,-3" fill="#FFFFFF" stroke="#023D6B" strokeWidth="1" />
            <polygon points="-26,-6 0,-15 26,-6 0,3" fill="#FFFFFF" stroke="#023D6B" strokeWidth="1" />
            <polygon points="-26,0 0,-9 26,0 0,9" fill="#FFFFFF" stroke="#023D6B" strokeWidth="1" />
            <polygon points="-26,6 0,-3 26,6 0,15" fill="#FFFFFF" stroke="#023D6B" strokeWidth="1" />
          </g>

          <g transform="translate(30, 0)">
            <polygon points="-26,-12 0,-21 26,-12 0,-3" fill="#FFFFFF" stroke="#023D6B" strokeWidth="1" />
            <polygon points="-26,-6 0,-15 26,-6 0,3" fill="#FFFFFF" stroke="#023D6B" strokeWidth="1" />
            <polygon points="-26,0 0,-9 26,0 0,9" fill="#FFFFFF" stroke="#023D6B" strokeWidth="1" />
            <polygon points="-26,6 0,-3 26,6 0,15" fill="#FFFFFF" stroke="#023D6B" strokeWidth="1" />
          </g>
        </g>
      </svg>
    );
  }

  // FULL LOGO WITH TEXT INCLUDED INSIDE THE SVG
  return (
    <svg
      viewBox="0 0 340 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Refah Sanat Pardis Commercial CO. Logo"
    >
      {/* EMBLEM GROUP (Centered at X=170, Y=125) */}
      <g transform="translate(170, 122)">
        {/* Top Blue Chevron */}
        <path
          d="M 0,-104 L 42,-62 L 26,-62 L 0,-88 L -26,-62 L -42,-62 Z"
          fill="#023D6B"
        />

        {/* Bottom Blue Chevron */}
        <path
          d="M 0,104 L 42,62 L 26,62 L 0,88 L -26,62 L -42,62 Z"
          fill="#023D6B"
        />

        {/* Left Grey Chevron */}
        <path
          d="M -104,0 L -62,-42 L -62,-26 L -88,0 L -62,26 L -62,42 Z"
          fill="#7C8793"
        />

        {/* Right Grey Chevron */}
        <path
          d="M 104,0 L 62,-42 L 62,-26 L 88,0 L 62,26 L 62,42 Z"
          fill="#7C8793"
        />

        {/* Central Dark Blue Square */}
        <rect x="-62" y="-62" width="124" height="124" fill="#023D6B" rx="1" />

        {/* UPPER SECTION: White Gear with Inner Symbol */}
        <g transform="translate(0, -18)">
          <g fill="#FFFFFF">
            <rect x="-4" y="-35" width="8" height="7" rx="1" />
            <rect x="-4" y="28" width="8" height="7" rx="1" />
            <rect x="-35" y="-4" width="7" height="8" rx="1" />
            <rect x="28" y="-4" width="7" height="8" rx="1" />

            <rect x="-4" y="-35" width="8" height="7" rx="1" transform="rotate(45)" />
            <rect x="-4" y="-35" width="8" height="7" rx="1" transform="rotate(135)" />
            <rect x="-4" y="-35" width="8" height="7" rx="1" transform="rotate(225)" />
            <rect x="-4" y="-35" width="8" height="7" rx="1" transform="rotate(315)" />

            <circle cx="0" cy="0" r="30" />
          </g>

          <circle cx="0" cy="0" r="20" fill="#023D6B" />

          {/* Center Emblem */}
          <g fill="#FFFFFF" transform="scale(0.65)">
            <path d="M -11,-9 L 3,-9 C 9,-9 13,-5 13,0 C 13,5 9,9 3,9 L -4,9 L -4,3 L 3,3 C 5,3 7,1 7,0 C 7,-1 5,-3 3,-3 L -11,-3 Z" />
            <path d="M 11,9 L -3,9 C -9,9 -13,5 -13,0 C -13,-5 -9,-9 -3,-9 L 4,-9 L 4,-3 L -3,-3 C -5,-3 -7,-1 -7,0 C -7,1 -5,3 -3,3 L 11,3 Z" />
            <polygon points="0,-15 5,-9 -5,-9" />
            <polygon points="0,15 5,9 -5,9" />
          </g>
        </g>

        {/* LOWER SECTION: Two Isometric Stacks of Ingots / Sheets */}
        <g transform="translate(0, 28)">
          <g transform="translate(-24, 0)">
            <polygon points="-20,-9 0,-16 20,-9 0,-2" fill="#FFFFFF" stroke="#023D6B" strokeWidth="0.9" />
            <polygon points="-20,-4 0,-11 20,-4 0,3" fill="#FFFFFF" stroke="#023D6B" strokeWidth="0.9" />
            <polygon points="-20,1 0,-6 20,1 0,8" fill="#FFFFFF" stroke="#023D6B" strokeWidth="0.9" />
            <polygon points="-20,6 0,-1 20,6 0,13" fill="#FFFFFF" stroke="#023D6B" strokeWidth="0.9" />
          </g>

          <g transform="translate(24, 0)">
            <polygon points="-20,-9 0,-16 20,-9 0,-2" fill="#FFFFFF" stroke="#023D6B" strokeWidth="0.9" />
            <polygon points="-20,-4 0,-11 20,-4 0,3" fill="#FFFFFF" stroke="#023D6B" strokeWidth="0.9" />
            <polygon points="-20,1 0,-6 20,1 0,8" fill="#FFFFFF" stroke="#023D6B" strokeWidth="0.9" />
            <polygon points="-20,6 0,-1 20,6 0,13" fill="#FFFFFF" stroke="#023D6B" strokeWidth="0.9" />
          </g>
        </g>
      </g>

      {/* TEXT SECTION BELOW LOGO EMBLEM */}
      <g textAnchor="middle" fill={textColor}>
        {/* Main Persian Title */}
        <text
          x="170"
          y="262"
          fontFamily="Vazirmatn, Tahoma, sans-serif"
          fontWeight="800"
          fontSize="20.5"
          letterSpacing="0"
        >
          شرکت بازرگانی رفاه صنعت پردیس
        </text>

        {/* Subtitle Persian */}
        <text
          x="170"
          y="292"
          fontFamily="Vazirmatn, Tahoma, sans-serif"
          fontWeight="700"
          fontSize="14.5"
        >
          (سهامی خاص)
        </text>

        {/* English Title */}
        <text
          x="170"
          y="326"
          fontFamily="Times New Roman, Georgia, serif"
          fontWeight="600"
          fontSize="15.5"
          letterSpacing="0.3"
        >
          Refah Sanat Pardis Commercial CO.
        </text>
      </g>
    </svg>
  );
};
