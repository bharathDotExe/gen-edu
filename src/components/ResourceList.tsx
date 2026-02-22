import React from 'react';
import { FileText, MonitorPlay, FileCode, Download, FlaskConical, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssignmentFile {
    name: string;
    type: string;
    content?: string;
    link?: string;
}


interface ResourceListProps {
    files: AssignmentFile[];
    folder: string;
    onRead: (url: string, title: string, content?: string, type?: string) => void;
}


const ResourceList: React.FC<ResourceListProps> = ({ files, folder, onRead }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'syllabus': return <FileText className="text-neon-pink" />;
            case 'ppt': return <MonitorPlay className="text-neon-cyan" />;
            case 'assignment': return <FileCode className="text-neon-purple" />;
            case 'practical': return <FlaskConical className="text-neon-green" />;
            default: return <FileText className="text-slate-400" />;
        }
    };

    const getSubtext = (type: string) => {
        switch (type) {
            case 'syllabus': return 'Course Syllabus';
            case 'ppt': return 'Presentation Topic';
            case 'assignment': return 'Practical Assignment';
            case 'practical': return 'Practical Experiment';
            default: return 'Document';
        }
    };

    // Function to construct file path relative to public or src?
    // Since files are in 'assignments' folder in root, we need to serve them.
    // Vite serves 'public' folder. We need to move 'assignments' to 'public' or configure alias.
    // For now, assume they are accessible via /assignments URL if we move them, 
    // OR we use absolute file paths which browsers block.
    // BEST PRACTICE: Move 'assignments' folder to 'public/assignments'.
    // I will assume I will do that step next.

    const getFileUrl = (file: AssignmentFile) => {
        if (file.link) return file.link;
        // Handling subdirectories if filename contains '/'
        return `/assignments/${encodeURIComponent(folder)}/${encodeURIComponent(file.name)}`;
    };

    return (
        <div className="grid gap-3 sm:gap-4 flex-col lg:grid-cols-1 md:ml-12 lg:ml-64 xl:ml-80">
            {files.map((file, index) => {
                const isSpecialPdf = file.name === 'linux assignment .pdf' || file.name === 'linux assignment.pdf';

                return (
                    <div key={index} className="relative w-full">
                        {/* The floating box for desktop */}
                        {isSpecialPdf && (
                            <motion.div
                                initial={{ opacity: 0, x: -20, y: 10 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
                                className="hidden lg:flex absolute right-[calc(100%+1.5rem)] top-1/2 -translate-y-1/2 items-center w-[260px] z-20"
                            >
                                <div className="bg-white p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(168,85,247,0.3)] border border-neon-purple/30 relative w-full">
                                    <div className="absolute top-1/2 right-[-7px] transform -translate-y-1/2 w-4 h-4 bg-white border-r border-t border-neon-purple/30 rotate-45" />
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-neon-purple/10 flex items-center justify-center shrink-0">
                                            <MessageSquare className="w-4 h-4 text-neon-purple" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 leading-snug">
                                            open this pdf to get all assignments in one psd
                                        </p>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-purple rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                                </div>
                                {/* arrow SVG pointing back to the item */}
                                <svg className="absolute top-1/2 left-full w-6 h-[2px] -translate-y-1/2 pointer-events-none" preserveAspectRatio="none">
                                    <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(168,85,247,0.6)" strokeWidth="2" strokeDasharray="3 3" />
                                </svg>
                            </motion.div>
                        )}

                        {/* Mobile inline floating box */}
                        {isSpecialPdf && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                                transition={{ delay: 0.8 }}
                                className="lg:hidden w-full overflow-hidden"
                            >
                                <div className="bg-white p-3 rounded-xl shadow-lg border border-neon-purple/30 flex items-start gap-3 relative">
                                    <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-neon-purple/30 rotate-45" />
                                    <div className="w-6 h-6 rounded-full bg-neon-purple/10 flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-3 h-3 text-neon-purple" />
                                    </div>
                                    <p className="text-xs font-medium text-slate-700 leading-snug">
                                        open this pdf to get all assignments in one psd
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass p-3 sm:p-4 rounded-xl flex items-center gap-3 sm:gap-4 group transition-all cursor-pointer w-full overflow-hidden ${isSpecialPdf ? 'ring-2 ring-neon-purple/50 bg-white/10 shadow-lg shadow-neon-purple/10 hover:bg-white/20' : 'hover:bg-white/5'}`}
                            onClick={() => onRead(getFileUrl(file), file.name.split('/').pop() || 'Document', file.content, file.type)}
                        >
                            <div className="p-2 sm:p-3 bg-white border border-slate-100 rounded-lg group-hover:scale-110 transition-transform shrink-0 relative">
                                {isSpecialPdf && (
                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neon-purple rounded-full animate-bounce" />
                                )}
                                {getIcon(file.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-slate-900 truncate text-sm sm:text-base" title={file.name}>
                                    {file.name.split('/').pop()}
                                </h4>
                                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">{getSubtext(file.type)}</p>
                            </div>
                            <a
                                href={getFileUrl(file)}
                                download={!file.link}
                                target={file.link ? "_blank" : undefined}
                                rel={file.link ? "noopener noreferrer" : undefined}
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-full hover:bg-neon-purple/10 text-slate-400 hover:text-neon-purple transition-all"
                                title="Download PDF"
                            >
                                <Download className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};

export default ResourceList;
