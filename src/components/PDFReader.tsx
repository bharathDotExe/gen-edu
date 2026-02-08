import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Loader2, AlertCircle, Download } from 'lucide-react';

// Using local worker to avoid version mismatch and CORS issues
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf/pdf.worker.min.js';

interface PDFReaderProps {
    url: string;
    content?: string;
}

const PDFReader: React.FC<PDFReaderProps> = ({ url, content }) => {
    const [text, setText] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const extractText = async () => {
            try {
                if (content) {
                    setText(content.split('\n'));
                    setLoading(false);
                    return;
                }

                setLoading(true);
                setError(null);
                setText([]);

                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;
                const numPages = pdf.numPages;
                let extractedText: string[] = [];

                for (let i = 1; i <= numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items
                        .map((item: any) => item.str)
                        .join(' ');

                    if (pageText.trim()) {
                        extractedText.push(pageText);
                    }
                }

                if (extractedText.length === 0) {
                    setError("No text could be extracted from this PDF. It might be an image-based PDF.");
                } else {
                    setText(extractedText);
                }
            } catch (err: any) {
                console.error("PDF Extraction Error:", err);
                setError(`Failed to load PDF: ${err.message || 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        };

        extractText();
    }, [url, content]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                <p className="text-slate-500 text-sm">Loading document...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <p className="text-slate-800 font-medium">{error}</p>
                <p className="text-xs text-slate-500 break-all max-w-md">URL: {url}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                    Download Original PDF
                </a>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans text-slate-900 leading-normal p-8">

            {/* Simple Download Link (Top Right) */}
            <div className="max-w-4xl mx-auto flex justify-end mb-8 print:hidden">
                <a
                    href={url}
                    download
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                </a>
            </div>

            {/* Document Container */}
            <div className="max-w-4xl mx-auto">
                <article className="space-y-4">
                    {text.map((line, index) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <div key={index} className="h-4" />; // Spacer

                        // 1. Main Title: "Choice Based Assessment..."
                        if (trimmed.includes('Choice Based Assessment') || trimmed.includes('Assignment')) {
                            return (
                                <h1 key={index} className="text-xl font-bold text-black mb-8">
                                    {trimmed}
                                </h1>
                            );
                        }

                        // 2. Category / Section Headers
                        if (trimmed.startsWith('Category') || trimmed.startsWith('Unit')) {
                            return (
                                <div key={index} className="mt-8 mb-4">
                                    {index > 0 && <hr className="border-t-2 border-slate-300 mb-8" />}
                                    <h2 className="text-lg font-bold text-black">
                                        {trimmed}
                                    </h2>
                                </div>
                            );
                        }

                        // 3. Instruction Text: "Choose one of the following..."
                        if (trimmed.includes('Choose one of the following tasks') || trimmed.includes('Answer text')) {
                            return (
                                <p key={index} className="italic text-slate-800 mb-4">
                                    {trimmed}
                                </p>
                            );
                        }

                        // 4. Options: "Option A (Title): Description"
                        if (trimmed.startsWith('Option') || trimmed.startsWith('• Option')) {
                            // Split into Bold part and Normal part
                            const splitIndex = trimmed.indexOf(':');
                            const boldPart = splitIndex !== -1 ? trimmed.substring(0, splitIndex + 1) : trimmed;
                            const normalPart = splitIndex !== -1 ? trimmed.substring(splitIndex + 1) : '';

                            return (
                                <div key={index} className="flex gap-4 mb-6 pl-4">
                                    <span className="text-black font-bold text-lg">•</span>
                                    <div>
                                        <span className="font-bold text-black">{boldPart.replace(/^[•\s]*/, '')}</span>
                                        <span className="text-slate-800 text-justify">{normalPart}</span>
                                    </div>
                                </div>
                            );
                        }

                        // 5. Numbered Lists
                        if (/^\d+\./.test(trimmed)) {
                            return (
                                <div key={index} className="flex gap-4 mb-3 pl-12">
                                    <span className="font-sans text-slate-700 w-6 text-right shrink-0">
                                        {trimmed.match(/^\d+\./)?.[0]}
                                    </span>
                                    <p className="text-slate-800 text-justify">
                                        {trimmed.replace(/^\d+\.\s*/, '')}
                                    </p>
                                </div>
                            );
                        }

                        // 6. Regular Text
                        return (
                            <p key={index} className="text-slate-800 mb-4 text-justify">
                                {trimmed}
                            </p>
                        );
                    })}
                </article>
            </div>
        </div>
    );
};

export default PDFReader;
