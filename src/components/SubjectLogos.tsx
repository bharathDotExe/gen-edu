

export const LinuxLogo = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
            <linearGradient id="linuxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#linuxGrad)" opacity="0.2" />
        <path d="M30 35 L45 50 L30 65 M55 65 L75 65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-amber-500" />
        <rect x="25" y="25" width="50" height="50" rx="8" stroke="currentColor" strokeWidth="4" className="text-slate-800/20" fill="none" />
    </svg>
);

export const PythonLogo = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
            <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
        </defs>
        <path d="M50 20 C20 20 20 50 40 50 L40 50 L60 50 C80 50 80 20 50 20 Z" fill="url(#pyBlue)" />
        <path d="M50 80 C80 80 80 50 60 50 L60 50 L40 50 C20 50 20 80 50 80 Z" fill="url(#pyYellow)" />
        <circle cx="35" cy="30" r="4" fill="white" />
        <circle cx="65" cy="70" r="4" fill="white" />
    </svg>
);

export const SELogo = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
            <linearGradient id="seGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
        </defs>
        <path d="M50 15 L60 35 L80 35 L65 50 L75 70 L50 60 L25 70 L35 50 L20 35 L40 35 Z" fill="url(#seGrad)" className="animate-spin-slow" style={{ transformOrigin: 'center', animationDuration: '10s' }} />
        <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.9" />
        <path d="M42 45 L50 55 L58 45" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
);

export const WebLogo = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
            <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="40" stroke="url(#webGrad)" strokeWidth="4" fill="none" />
        <ellipse cx="50" cy="50" rx="40" ry="15" stroke="url(#webGrad)" strokeWidth="2" fill="none" className="opacity-50" transform="rotate(45 50 50)" />
        <ellipse cx="50" cy="50" rx="40" ry="15" stroke="url(#webGrad)" strokeWidth="2" fill="none" className="opacity-50" transform="rotate(-45 50 50)" />
        <circle cx="50" cy="50" r="10" fill="url(#webGrad)" />
    </svg>
);
