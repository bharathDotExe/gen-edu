import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SubjectCardProps {
    id: string;
    title: string;
    Cover: React.FC;
    description: string;
    delay: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ id, title, Cover, description, delay }) => {
    return (
        <Link to={`/subject/${id}`} className="block h-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative h-[320px] rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 pointer-events-auto"
            >
                {/* Cover Image Background */}
                <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700">
                    <Cover />
                </div>

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-left z-10">
                    <div className="flex-1" />

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors drop-shadow-md">
                        {title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4 group-hover:text-white transition-colors drop-shadow-sm">
                        {description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neon-purple opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Explore Course <span className="text-lg leading-none">→</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default SubjectCard;
