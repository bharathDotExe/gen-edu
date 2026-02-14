import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';
import assignmentsData from '../data/assignments.json';

// Simple PIN for basic protection (client-side only, not secure but better than nothing for this use case)
const UPLOAD_PIN = "2024";

const UploadPage = () => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [fileType, setFileType] = useState('assignment');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [backendStatus, setBackendStatus] = useState<'checking' | 'ok' | 'error'>('checking');

    React.useEffect(() => {
        fetch('/api/health')
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Backend not reachable');
            })
            .then(() => setBackendStatus('ok'))
            .catch(() => setBackendStatus('error'));
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === UPLOAD_PIN) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect PIN');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !selectedSubject) return;

        setLoading(true);
        setStatus({ type: null, message: '' });

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64Content = (reader.result as string).split(',')[1];

                const subject = assignmentsData.find(s => s.id === selectedSubject);
                if (!subject) throw new Error("Invalid subject");

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fileContent: base64Content,
                        fileName: file.name,
                        subjectId: selectedSubject,
                        folder: subject.folder, // Use the folder name from data
                        type: fileType
                    })
                });

                const contentType = response.headers.get("content-type");
                let result;
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    result = await response.json();
                } else {
                    // Start of non-JSON response handling
                    const text = await response.text();
                    console.error("API Error (Non-JSON):", text);
                    if (text.includes("timeout")) {
                        throw new Error("Upload timed out. File might be too large (max 4.5MB on Vercel free tier).");
                    }
                    // Extract title if it's an HTML error page
                    const titleMatch = text.match(/<title>(.*?)<\/title>/);
                    const errorMsg = titleMatch ? titleMatch[1] : text.slice(0, 100);
                    throw new Error(`Server Error (${response.status}): ${errorMsg}`);
                }

                if (!response.ok) throw new Error(result.error || 'Upload failed');

                setStatus({ type: 'success', message: 'File uploaded successfully! Changes will appear in a few minutes.' });
                setFile(null);
            };
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
                >
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Enter PIN"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all"
                        >
                            Access Uploads
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-green-500/10 rounded-xl">
                            <Upload className="w-6 h-6 text-green-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Upload Assignment</h1>
                    </div>

                    {backendStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
                            <p className="font-bold flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Backend Not Reachable</p>
                            <p className="text-sm mt-1">The upload function is not accessible. If you are running locally, use <code>vercel dev</code>. If on Vercel, check the function logs.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors"
                                required
                            >
                                <option value="">Select Subject</option>
                                {assignmentsData.map(subject => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                            <select
                                value={fileType}
                                onChange={(e) => setFileType(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors"
                            >
                                <option value="assignment">Assignment</option>
                                <option value="syllabus">Syllabus</option>
                                <option value="ppt">PPT</option>
                                <option value="notes">Notes</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">File</label>
                            <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 transition-colors hover:border-green-500/30">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.docx,.pptx"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="text-center">
                                    <FileText className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                                    {file ? (
                                        <p className="text-green-400 font-medium">{file.name}</p>
                                    ) : (
                                        <p className="text-gray-400">Click to upload or drag and drop</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {status.message && (
                            <div className={`p-4 rounded-xl flex items-start gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {status.type === 'success' ? <Check className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                                <p>{status.message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !file || !selectedSubject}
                            className="w-full bg-green-500 hover:bg-green-400 disabled:bg-gray-800 disabled:text-gray-500 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Upload File'
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UploadPage;
