import React from 'react';
import { motion } from 'framer-motion';
import SubjectCard from '../components/SubjectCard';
import { LinuxCover, PythonCover, SECover, WebCover } from '../components/SubjectCovers';

const subjects = [
    {
        id: 'linux',
        title: 'Linux Programming',
        Cover: LinuxCover,
        description: 'Master the command line, scripting, and system administration.',
        delay: 0.1
    },
    {
        id: 'python',
        title: 'Python Programming',

        Cover: PythonCover,
        description: 'Dive into data science, automation, and backend development.',
        delay: 0.2
    },
    {
        id: 'se',
        title: 'Software Engineering',

        Cover: SECover,
        description: 'Learn methodologies, design patterns, and project management.',
        delay: 0.3
    },
    {
        id: 'web',
        title: 'Web Technology',

        Cover: WebCover,
        description: 'Build modern, responsive websites with HTML, CSS, and JS.',
        delay: 0.4
    }
];

const Home: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold font-display"
                >
                    <span className="text-gradient">Level Up</span> Your Skills
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-500 max-w-2xl mx-auto text-lg"
                >
                    Access all your course materials, assignments, and resources in one futuristic dashboard.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.map((subject) => (
                    <SubjectCard key={subject.id} {...subject} />
                ))}
            </div>
        </div>
    );
};

export default Home;
