

export const LinuxCover = () => (
    <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-600/20" />
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="terminal" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <text x="2" y="15" fontSize="10" fill="currentColor" fontFamily="monospace">$_</text>
            </pattern>
            <rect width="100%" height="100%" fill="url(#terminal)" className="text-amber-500" />
        </svg>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/30 rounded-full blur-3xl" />
    </div>
);

export const PythonCover = () => (
    <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/20 to-yellow-500/20" />
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
            <path d="M0 50 Q 25 20 50 50 T 100 50" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-400" />
            <path d="M0 60 Q 35 30 60 60 T 100 60" stroke="currentColor" strokeWidth="2" fill="none" className="text-yellow-400" />
            <path d="M0 40 Q 15 10 40 40 T 100 40" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-300" />
        </svg>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
    </div>
);

export const SECover = () => (
    <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
            <rect x="10" y="10" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1" fill="none" className="text-purple-400" />
            <rect x="40" y="40" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1" fill="none" className="text-pink-400" />
            <rect x="70" y="10" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1" fill="none" className="text-purple-400" />
            <path d="M20 25 L 20 35 L 40 47" stroke="currentColor" strokeWidth="1" fill="none" className="text-white" />
            <path d="M80 25 L 80 35 L 60 47" stroke="currentColor" strokeWidth="1" fill="none" className="text-white" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
    </div>
);

export const WebCover = () => (
    <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20" />
        <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-500/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-emerald-500/30 rounded-full" />
    </div>
);
