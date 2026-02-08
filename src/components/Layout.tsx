import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Background from './Background';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen relative overflow-hidden text-light-text font-sans">
            <Background />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-4">
                <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter hover:scale-105 transition-transform">
                        <Zap className="w-6 h-6 text-neon-pink animate-float" />
                        <span className="text-gradient">GEN-Z EDU</span>
                    </Link>

                    <div className="flex items-center gap-4 md:gap-6 font-medium text-sm overflow-x-auto no-scrollbar pb-1 -mb-1 max-w-[200px] md:max-w-none">
                        <Link to="/" className={`shrink-0 hover:text-neon-cyan transition-colors ${location.pathname === '/' ? 'text-neon-cyan' : 'text-gray-400'}`}>Home</Link>
                        <Link to="/subject/linux" className={`shrink-0 hover:text-neon-purple transition-colors ${location.pathname.includes('linux') ? 'text-neon-purple' : 'text-gray-400'}`}>Linux</Link>
                        <Link to="/subject/python" className={`shrink-0 hover:text-neon-green transition-colors ${location.pathname.includes('python') ? 'text-neon-green' : 'text-gray-400'}`}>Python</Link>
                        <Link to="/subject/se" className={`shrink-0 hover:text-neon-pink transition-colors ${location.pathname.includes('se') ? 'text-neon-pink' : 'text-gray-400'}`}>SE</Link>
                        <Link to="/subject/web" className={`shrink-0 hover:text-neon-blue transition-colors ${location.pathname.includes('web') ? 'text-neon-blue' : 'text-gray-400'}`}>Web</Link>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="relative z-20 pt-24 px-4 pb-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-6 text-center text-gray-500 text-sm">
                <p>© 2026 GEN-Z EDU. Build the Future.</p>
            </footer>
        </div>
    );
};

export default Layout;
