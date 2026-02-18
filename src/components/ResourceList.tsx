import React from 'react';
import { FileText, MonitorPlay, FileCode, Download, FlaskConical } from 'lucide-react';
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
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-1">
            {files.map((file, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-3 sm:p-4 rounded-xl flex items-center gap-3 sm:gap-4 group hover:bg-white/5 transition-colors cursor-pointer w-full overflow-hidden"
                    onClick={() => onRead(getFileUrl(file), file.name.split('/').pop() || 'Document', file.content, file.type)}
                >
                    <div className="p-2 sm:p-3 bg-white border border-slate-100 rounded-lg group-hover:scale-110 transition-transform shrink-0">
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
            ))}
        </div>
    );
};

export default ResourceList;
