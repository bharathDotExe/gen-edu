import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ResourceList from '../components/ResourceList';
import Modal from '../components/Modal';
import PDFReader from '../components/PDFReader';
import assignmentsData from '../data/assignments.json';
import { motion } from 'framer-motion';

const SubjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedFile, setSelectedFile] = useState<{ url: string; title: string; content?: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'syllabus' | 'ppt' | 'assignment'>('assignment');
    const subject = assignmentsData.find(s => s.id === id);

    if (!subject) {
        return <Navigate to="/" replace />;
    }

    const tabs = [
        { id: 'assignment', label: 'Assignments', color: 'bg-neon-purple', text: 'text-neon-purple' },
        { id: 'ppt', label: 'PPT Topics', color: 'bg-neon-cyan', text: 'text-neon-cyan' },
        { id: 'syllabus', label: 'Syllabus', color: 'bg-neon-pink', text: 'text-neon-pink' },
    ] as const;

    const filteredFiles = subject.files.filter(f => f.type === activeTab);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold font-display text-slate-900 mb-2"
                    >
                        {subject.name}
                    </motion.h1>
                    <p className="text-slate-500">Access your course materials.</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-[300px]">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {filteredFiles.length > 0 ? (
                        <div className="glass-card">
                            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${tabs.find(t => t.id === activeTab)?.text}`}>
                                <span className={`w-2 h-8 rounded-full ${tabs.find(t => t.id === activeTab)?.color}`} />
                                {tabs.find(t => t.id === activeTab)?.label}
                            </h2>
                            <ResourceList
                                files={filteredFiles}
                                folder={subject.folder}
                                onRead={(url, title, content) => setSelectedFile({ url, title, content })}
                            />
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                            <p className="text-slate-400">No content available for this category yet.</p>
                        </div>
                    )}
                </motion.div>
            </div>

            <Modal
                isOpen={!!selectedFile}
                onClose={() => setSelectedFile(null)}
                title={selectedFile?.title}
            >
                {selectedFile && <PDFReader url={selectedFile.url} content={selectedFile.content} />}
            </Modal>
        </div>
    );
};

export default SubjectPage;
