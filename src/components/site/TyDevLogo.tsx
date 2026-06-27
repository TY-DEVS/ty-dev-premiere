export function TyDevLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative group flex items-center ${className}`}>
      {/* Subtle glow effect behind the logo */}
      <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* The image with screen blending mode to remove black background */}
      <img 
        src="/logo.jpg" 
        alt="TY Dev Logo" 
        className="relative h-12 w-auto object-cover scale-150 transform transition-transform duration-500 group-hover:scale-[1.55] mix-blend-screen"
        style={{ mixBlendMode: "screen", maskImage: "linear-gradient(to right, black 80%, transparent 100%)" }}
      />
    </div>
  );
}
