import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Background from './Background';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home', color: 'hover:text-neon-cyan', activeColor: 'text-neon-cyan' },
        { path: '/subject/linux', label: 'Linux', color: 'hover:text-neon-purple', activeColor: 'text-neon-purple' },
        { path: '/subject/python', label: 'Python', color: 'hover:text-neon-green', activeColor: 'text-neon-green' },
        { path: '/subject/se', label: 'SE', color: 'hover:text-neon-pink', activeColor: 'text-neon-pink' },
        { path: '/subject/web', label: 'Web', color: 'hover:text-neon-blue', activeColor: 'text-neon-blue' },
        { path: '/timetable', label: 'Time Table', color: 'hover:text-neon-pink', activeColor: 'text-neon-pink' },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden text-light-text font-sans">
            <Background />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 p-4">
                <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter hover:scale-105 transition-transform" onClick={() => setIsMenuOpen(false)}>
                        <Zap className="w-6 h-6 text-neon-pink animate-float" />
                        <span className="text-gradient">GEN-Z EDU</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 font-medium text-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`transition-colors ${link.color} ${location.pathname === link.path || (link.path !== '/' && location.pathname.includes(link.path)) ? link.activeColor : 'text-gray-400'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 glass rounded-full text-gray-400 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-slate-900/90 border-l border-white/10 z-[70] md:hidden p-8 flex flex-col gap-8 shadow-2xl backdrop-blur-xl"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-display font-bold text-xl text-gradient">MENU</span>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 glass rounded-full text-gray-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`text-2xl font-bold font-display transition-all ${location.pathname === link.path || (link.path !== '/' && location.pathname.includes(link.path)) ? link.activeColor : 'text-gray-500'}`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/5">
                                <p className="text-gray-600 text-xs font-medium tracking-widest uppercase">Gen-Z Education</p>
                                <p className="text-gray-500 text-xs mt-2">v0.1.0 Alpha</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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
                <p className="mb-2">© 2026 GEN-Z EDU. Build the Future.</p>
                <Link to="/upload" className="inline-block mt-4 text-xs font-medium text-green-500 hover:text-green-400 transition-colors border border-green-500/30 hover:border-green-500 rounded-full px-3 py-1">
                    Admin Upload
                </Link>
            </footer>
        </div>
    );
};

export default Layout;
