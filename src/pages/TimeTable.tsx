import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, User, BookOpen } from 'lucide-react';

interface ClassItem {
    time: string;
    course: string;
    code?: string;
    cdi?: string;
    type?: string;
    room?: string;
    color: string;
}

interface DaySchedule {
    day: string;
    classes: ClassItem[];
}

const schedule: DaySchedule[] = [
    {
        day: 'Monday',
        classes: [
            { time: '07:15 - 08:45', course: 'MIL E/K/H (BATCH 5 & 6)', color: 'bg-amber-400' },
            { time: '08:45 - 09:30', course: 'BREAK', color: 'bg-slate-200' },
            { time: '09:30 - 10:15', course: 'Software Engineering', code: '05ABCAR24413', cdi: 'Ms. Elizabeth', type: 'Theory', color: 'bg-pink-400' },
            { time: '10:15 - 11:00', course: 'Python Programming', code: '05ABCAR24411', cdi: 'Ms. Bhagyalakshmi', type: 'Practical', color: 'bg-purple-400' },
            { time: '11:10 - 11:55', course: 'FL -- F/G/S BATCH 3', code: 'F-485/G-484/S-30', color: 'bg-amber-400' },
            { time: '12:00 - 12:45', course: 'NSS/NCC/R&R/Cultural/Sports', color: 'bg-amber-400' },
        ]
    },
    {
        day: 'Tuesday',
        classes: [
            { time: '07:15 - 08:45', course: 'Python Programming', code: '05ABCAR24411', cdi: 'Ms. Bhagyalakshmi', type: 'Theory', color: 'bg-purple-400' },
            { time: '08:45 - 09:30', course: 'BREAK', color: 'bg-slate-200' },
            { time: '09:30 - 10:15', course: 'Linux & Shell Programming', code: '05ABCAR24412', cdi: 'Ms. Kirti', type: 'Practical', color: 'bg-blue-400' },
            { time: '10:15 - 11:00', course: 'Linux & Shell Programming', code: '05ABCAR24412', cdi: 'Ms. Kirti', type: 'Practical', color: 'bg-blue-400' },
            { time: '11:10 - 11:55', course: 'Software Engineering', code: '05ABCAR24413', cdi: 'Ms. Elizabeth', type: 'Theory', color: 'bg-pink-400' },
        ]
    },
    {
        day: 'Wednesday',
        classes: [
            { time: '07:15 - 08:45', course: 'Web Technology', code: '05ABCAR24414', cdi: 'Ms. Pallabee', type: 'Theory', color: 'bg-emerald-400' },
            { time: '08:45 - 09:30', course: 'BREAK', color: 'bg-slate-200' },
            { time: '09:30 - 10:15', course: 'FL -- F/G/S BATCH 3', code: 'F-485/G-484/S-30', color: 'bg-amber-400' },
            { time: '10:15 - 11:00', course: 'FL -- F/G/S BATCH 3', code: 'F-485/G-484/S-30', color: 'bg-amber-400' },
            { time: '11:10 - 11:55', course: 'Software Engineering', code: '05ABCAR24413', cdi: 'Ms. Elizabeth', type: 'Theory', color: 'bg-pink-400' },
            { time: '12:00 - 12:45', course: 'Indian Constitution (Coursera)', color: 'bg-emerald-400' },
        ]
    },
    {
        day: 'Thursday',
        classes: [
            { time: '07:15 - 08:45', course: 'Linux & Shell Programming', code: '05ABCAR24412', cdi: 'Ms. Kirti', type: 'Practical', color: 'bg-blue-400' },
            { time: '08:45 - 09:30', course: 'BREAK', color: 'bg-slate-200' },
            { time: '09:30 - 10:15', course: 'Software Engineering', code: '05ABCAR24413', cdi: 'Ms. Elizabeth', type: 'Theory', color: 'bg-pink-400' },
            { time: '10:15 - 11:00', course: 'Web Technology', code: '05ABCAR24414', cdi: 'Ms. Pallabee', type: 'Theory', color: 'bg-emerald-400' },
            { time: '11:10 - 11:55', course: 'LIBRARY', color: 'bg-sky-400' },
        ]
    },
    {
        day: 'Friday',
        classes: [
            { time: '07:15 - 08:45', course: 'Web Technology', code: '05ABCAR24414', cdi: 'Ms. Pallabee', type: 'Theory', color: 'bg-emerald-400' },
            { time: '08:45 - 09:30', course: 'BREAK', color: 'bg-slate-200' },
            { time: '09:30 - 10:15', course: 'Linux & Shell Programming', code: '05ABCAR24412', cdi: 'Ms. Kirti', type: 'Practical', color: 'bg-blue-400' },
            { time: '10:15 - 11:00', course: 'Python Programming', code: '05ABCAR24411', cdi: 'Ms. Bhagyalakshmi', type: 'Theory', color: 'bg-purple-400' },
            { time: '11:10 - 11:55', course: 'COURSERA', color: 'bg-green-400' },
            { time: '12:00 - 12:45', course: 'NSS/NCC/R&R/Cultural/Sports', color: 'bg-amber-400' },
        ]
    }
];

const TimeTable: React.FC = () => {
    const [activeDay, setActiveDay] = useState(schedule[0].day);

    return (
        <div className="space-y-8">
            <header className="text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-4"
                >
                    <Calendar className="w-4 h-4 text-neon-pink" />
                    <span className="text-sm font-bold tracking-widest uppercase text-slate-400">Schedule 2026</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold font-display text-slate-900 mb-2"
                >
                    <span className="text-gradient">Time Table</span>
                </motion.h1>
                <p className="text-slate-500 max-w-lg mx-auto">UG SEM III • BCA C • Room No 384</p>
            </header>

            {/* Day Selector (Mobile & Desktop) */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                {schedule.map((day) => (
                    <button
                        key={day.day}
                        onClick={() => setActiveDay(day.day)}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeDay === day.day
                            ? 'bg-slate-900 text-white shadow-xl scale-105'
                            : 'glass text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        {day.day}
                    </button>
                ))}
            </div>

            {/* Classes Display */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid gap-4 max-w-3xl mx-auto"
                >
                    {schedule.find(d => d.day === activeDay)?.classes.map((cls, idx) => (
                        <div
                            key={idx}
                            className="glass-card group flex flex-col xs:flex-row items-stretch xs:items-center gap-4 p-4 sm:p-6 overflow-hidden relative"
                        >
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${cls.color}`} />

                            <div className="flex flex-row xs:flex-col items-center xs:justify-center min-w-[80px] sm:min-w-[100px] text-slate-500 border-b xs:border-b-0 xs:border-r border-slate-100 pb-2 xs:pb-0 xs:pr-4">
                                <Clock className="w-3.5 h-3.5 mr-2 xs:mr-0 xs:mb-2 text-slate-400" />
                                <div className="flex flex-row xs:flex-col items-center gap-1 sm:gap-0">
                                    <span className="text-[10px] xs:text-xs font-bold leading-none">{cls.time.split(' - ')[0]}</span>
                                    <span className="text-[10px] xs:hidden text-slate-300">-</span>
                                    <div className="h-px w-4 bg-slate-200 my-1 hidden xs:block" />
                                    <span className="text-[10px] xs:text-xs">{cls.time.split(' - ')[1]}</span>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0 pt-1 xs:pt-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        {cls.type || (cls.course === 'BREAK' ? 'Interval' : 'General')}
                                    </span>
                                </div>
                                <h3 className="text-base sm:text-xl font-bold text-slate-800 group-hover:text-neon-cyan transition-colors leading-snug">
                                    {cls.course}
                                </h3>
                                {cls.code && (
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] xs:text-xs">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="break-all">{cls.code}</span>
                                        </div>
                                        {cls.cdi && (
                                            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] xs:text-xs">
                                                <User className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="truncate">{cls.cdi}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TimeTable;
