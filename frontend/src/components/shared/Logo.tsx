import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
}

export function Logo({ className, iconClassName, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      <div className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:-translate-y-0.5",
        iconClassName
      )}>
        {/* Custom SVG Icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5"
        >
          {/* Outer Ring */}
          <circle 
            cx="12" cy="12" r="9" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeOpacity="0.3" 
          />
          {/* Inner Core (Representing "One" / Ichi) */}
          <rect 
            x="10.5" y="7" width="3" height="10" 
            rx="1.5" 
            fill="currentColor" 
          />
          {/* Orbiting Dots/Nodes representing tools */}
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          <circle cx="20" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="20" r="1.5" fill="currentColor" />
          <circle cx="4" cy="12" r="1.5" fill="currentColor" />
          
          {/* Pulse effect animation (via CSS) */}
          <circle 
            cx="12" cy="12" r="5" 
            fill="currentColor" 
            fillOpacity="0.2"
            className="animate-pulse"
          />
        </svg>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Ichi <span className="text-indigo-600 dark:text-indigo-400">Space</span>
          </span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em] -mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
            Universal Tools
          </span>
        </div>
      )}
    </div>
  );
}
