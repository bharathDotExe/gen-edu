import React, { useState } from 'react';
import { Loader2, AlertCircle, Download, ExternalLink } from 'lucide-react';

interface PDFReaderProps {
    url: string;
    title?: string;
}

const PDFReader: React.FC<PDFReaderProps> = ({ url, title }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className="flex flex-col h-full bg-slate-900 overflow-hidden relative">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 select-none">
                <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-slate-300 text-sm font-medium truncate max-w-[200px] md:max-w-md">
                        {title || 'Document Viewer'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href={url}
                        download
                        className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Download PDF"
                    >
                        <Download className="w-4 h-4" />
                    </a>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Open in new tab"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 relative bg-slate-100">
                {loading && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 z-10">
                        <Loader2 className="w-8 h-8 animate-spin text-neon-purple mb-4" />
                        <p className="text-slate-500 font-medium">Loading PDF viewer...</p>
                    </div>
                )}

                {error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Unable to display PDF</h3>
                        <p className="text-slate-500 mb-6 max-w-sm">
                            Your browser might not support PDF embedding or the file is temporarily unavailable.
                        </p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download Original PDF
                        </a>
                    </div>
                ) : (
                    <iframe
                        src={`${url}#toolbar=0&navpanes=0&scrollbar=1`}
                        className="w-full h-full border-none"
                        onLoad={() => setLoading(false)}
                        onError={() => {
                            setError(true);
                            setLoading(false);
                        }}
                        title={title || 'PDF Document'}
                    />
                )}
            </div>
        </div>
    );
};

export default PDFReader;
