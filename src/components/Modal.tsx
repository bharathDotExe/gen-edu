import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-2 md:inset-10 z-[51] flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full h-full flex flex-col pointer-events-auto overflow-hidden border border-slate-200">
                            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
                                <h3 className="font-bold text-lg text-slate-800">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
