export function TyDevLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-brand/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <svg
          width="38"
          height="38"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-[0_0_8px_oklch(0.6_0.22_265/0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-90"
        >
          <defs>
            <linearGradient id="gearGrad" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="oklch(0.68 0.2 265)" />
              <stop offset="100%" stopColor="oklch(0.55 0.22 265)" />
            </linearGradient>
          </defs>
          <path
            d="M20 4 L23 7 L27 6 L29 10 L33 11 L33 15 L36 18 L34 22 L36 26 L33 29 L33 33 L29 34 L27 38 L23 37 L20 40 L17 37 L13 38 L11 34 L7 33 L7 29 L4 26 L6 22 L4 18 L7 15 L7 11 L11 10 L13 6 L17 7 Z"
            fill="url(#gearGrad)"
          />
          <circle cx="20" cy="22" r="10" fill="oklch(0.05 0.015 260)" />
          <text
            x="20"
            y="26.5"
            textAnchor="middle"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            fill="white"
            fontWeight="800"
            className="transition-transform duration-500 group-hover:-rotate-90 origin-[20px_22px]"
          >
            {"</>"}
          </text>
        </svg>
      </div>
      <span className="font-display text-2xl font-bold tracking-tight">
        <span className="text-brand drop-shadow-[0_0_10px_oklch(0.6_0.22_265/0.3)]">TY</span>
        <span className="text-foreground">Dev</span>
      </span>
    </div>
  );
}
