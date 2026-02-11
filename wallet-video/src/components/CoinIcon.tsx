import React from "react";

export const CoinIcon: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="27" rx="18" ry="17" fill="#8B6914" opacity={0.3} />
      <ellipse cx="24" cy="24" rx="18" ry="17" fill="url(#coinBody)" />
      <ellipse cx="24" cy="24" rx="14" ry="13" fill="url(#coinFace)" />
      <ellipse cx="24" cy="24" rx="12" ry="11.2" fill="none" stroke="#B8860B" strokeWidth={0.6} opacity={0.4} />
      <polygon
        points="24,14 26.5,19.5 32.5,20.2 28,24.2 29.2,30 24,27.2 18.8,30 20,24.2 15.5,20.2 21.5,19.5"
        fill="url(#coinStar)"
        stroke="#B8860B"
        strokeWidth={0.3}
      />
      <ellipse cx="19" cy="18" rx="5" ry="3" fill="#FFF8DC" opacity={0.25} transform="rotate(-20 19 18)" />
      <defs>
        <linearGradient id="coinBody" x1="8" y1="8" x2="40" y2="40">
          <stop offset="0%" stopColor="#F5D060" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="coinFace" x1="12" y1="12" x2="36" y2="36">
          <stop offset="0%" stopColor="#FFE87C" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#C49000" />
        </linearGradient>
        <linearGradient id="coinStar" x1="18" y1="14" x2="30" y2="30">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  );
};
