import React from 'react';

const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Mesh Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-50">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/40 mix-blend-multiply blur-3xl animate-float" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 mix-blend-multiply blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-200/40 mix-blend-multiply blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(rgb(148 163 184 / 0.1) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }} />

            {/* Geometric Shapes */}
            <div className="absolute top-1/4 left-10 w-24 h-24 border-4 border-slate-200/50 rounded-full animate-float" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-1/4 right-10 w-32 h-32 border-4 border-slate-200/50 rotate-45 animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl rotate-12 animate-pulse-slow" />
        </div>
    );
};

export default Background;
