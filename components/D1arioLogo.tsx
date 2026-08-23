import React from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';

interface D1arioLogoProps {
  size?: number;
  showGlow?: boolean;
}

export const D1arioLogo: React.FC<D1arioLogoProps> = ({ size = 36, showGlow = true }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <svg 
        viewBox="0 0 200 240" 
        width={size} 
        height={size} 
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="d1arioDropGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Main outer gradient */}
          <linearGradient id="dropBaseGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="35%" stopColor="#B91C1C" />
            <stop offset="70%" stopColor="#881337" />
            <stop offset="100%" stopColor="#4C0519" />
          </linearGradient>

          {/* Inner highlight ribbon 1 */}
          <linearGradient id="dropRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="40%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* Inner highlight ribbon 2 */}
          <linearGradient id="dropRibbon2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F1D1D" />
            <stop offset="50%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#F87171" />
          </linearGradient>

          {/* Center core shade */}
          <radialGradient id="dropCoreGlow" cx="45%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#991B1B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#450A0A" />
          </radialGradient>
        </defs>

        {/* Optional Ambient Glow Behind */}
        {showGlow && (
          <path
            d="M 100 12
               C 100 12, 168 100, 168 152
               C 168 190, 138 220, 100 220
               C 62 220, 32 190, 32 152
               C 32 100, 100 12, 100 12 Z"
            fill="rgba(220, 38, 38, 0.4)"
            filter="url(#d1arioDropGlow)"
          />
        )}

        {/* 1. Base Outer Droplet */}
        <path
          d="M 100 14
             C 100 14, 166 98, 166 150
             C 166 188, 136 218, 100 218
             C 64 218, 34 188, 34 150
             C 34 98, 100 14, 100 14 Z"
          fill="url(#dropBaseGrad)"
        />

        {/* 2. Outer Left Shadow Curve */}
        <path
          d="M 100 14
             C 75 70, 34 125, 34 150
             C 34 188, 64 218, 100 218
             C 70 210, 48 182, 48 150
             C 48 115, 85 55, 100 14 Z"
          fill="#4C0519"
          opacity="0.85"
        />

        {/* 3. Layered Inner Ribbon 1 (Left Swoop) */}
        <path
          d="M 100 25
             C 100 25, 154 100, 154 146
             C 154 178, 130 204, 100 204
             C 70 204, 46 178, 46 146
             C 46 112, 80 50, 100 25 Z"
          fill="url(#dropCoreGlow)"
        />

        {/* 4. Layered Ribbon Curve (Center Dynamic Wave) */}
        <path
          d="M 100 32
             C 118 70, 144 110, 144 144
             C 144 168, 126 188, 102 188
             C 78 188, 60 168, 60 144
             C 60 120, 78 80, 100 32 Z"
          fill="url(#dropRibbon1)"
        />

        {/* 5. Crescent Internal Swirl (matching the reference 3D ribbon loop) */}
        <path
          d="M 100 48
             C 115 80, 134 115, 134 140
             C 134 160, 118 174, 98 174
             C 78 174, 68 156, 68 140
             C 68 128, 74 112, 82 98
             C 76 115, 78 135, 88 150
             C 96 162, 114 160, 122 146
             C 128 134, 120 105, 100 48 Z"
          fill="url(#dropRibbon2)"
        />

        {/* 6. Subtle Top Light Reflection */}
        <path
          d="M 100 18
             C 104 35, 108 55, 108 72
             C 108 78, 104 84, 100 84
             C 96 84, 94 76, 96 68
             C 98 52, 100 32, 100 18 Z"
          fill="rgba(255, 255, 255, 0.35)"
        />
      </svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default D1arioLogo;
