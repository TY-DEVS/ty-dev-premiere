export function TyDevLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gearGrad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="oklch(0.68 0.2 265)" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 265)" />
          </linearGradient>
        </defs>
        <path
          d="M20 4 L23 7 L27 6 L29 10 L33 11 L33 15 L36 18 L34 22 L36 26 L33 29 L33 33 L29 34 L27 38 L23 37 L20 40 L17 37 L13 38 L11 34 L7 33 L7 29 L4 26 L6 22 L4 18 L7 15 L7 11 L11 10 L13 6 L17 7 Z"
          fill="url(#gearGrad)"
          opacity="0.9"
        />
        <circle cx="20" cy="22" r="9" fill="oklch(0.13 0.03 260)" />
        <text x="20" y="26" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="oklch(0.82 0.16 220)" fontWeight="700">
          {"</>"}
        </text>
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">
        <span style={{ color: "oklch(0.68 0.2 265)" }}>TY</span>
        <span className="text-foreground">Dev</span>
      </span>
    </div>
  );
}
