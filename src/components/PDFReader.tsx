import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Download, ExternalLink, Table as TableIcon } from 'lucide-react';
import * as XLSX from 'xlsx';

interface PDFReaderProps {
    url: string;
    title?: string;
}

const PDFReader: React.FC<PDFReaderProps> = ({ url, title }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fileType, setFileType] = useState<'pdf' | 'excel' | 'unknown'>('unknown');
    const [excelData, setExcelData] = useState<any[][]>([]);

    useEffect(() => {
        const detectAndLoad = async () => {
            try {
                setLoading(true);
                setError(null);

                const extension = url.split('.').pop()?.toLowerCase();

                if (extension === 'pdf') {
                    setFileType('pdf');
                    setLoading(false);
                } else if (['xls', 'xlsx', 'csv'].includes(extension || '')) {
                    setFileType('excel');

                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Failed to fetch file');

                    const arrayBuffer = await response.arrayBuffer();
                    const workbook = XLSX.read(arrayBuffer);

                    const sheetNames = workbook.SheetNames;
                    const firstSheet = workbook.Sheets[sheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][];

                    setExcelData(jsonData);
                    setLoading(false);
                } else {
                    setFileType('unknown');
                    setLoading(false);
                }
            } catch (err: any) {
                console.error("File Load Error:", err);
                setError(err.message || 'Failed to load file');
                setLoading(false);
            }
        };

        detectAndLoad();
    }, [url]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-neon-purple" />
                <p className="text-slate-500 font-medium">Preparing viewer...</p>
            </div>
        );
    }

    if (error || fileType === 'unknown') {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {fileType === 'unknown' ? 'Unsupported file format' : 'Unable to load file'}
                </h3>
                <p className="text-slate-500 mb-6 max-w-sm">
                    {error || "We don't support previewing this file type yet."}
                </p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Download Original File
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-900 overflow-hidden relative">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 select-none shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-1.5 bg-slate-700 rounded-lg">
                        {fileType === 'pdf' ? (
                            <ExternalLink className="w-4 h-4 text-sky-400" />
                        ) : (
                            <TableIcon className="w-4 h-4 text-emerald-400" />
                        )}
                    </div>
                    <span className="text-slate-200 text-xs md:text-sm font-semibold truncate max-w-[120px] md:max-w-md">
                        {title || 'Document Viewer'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href={url}
                        download
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Download"
                    >
                        <Download className="w-4 h-4" />
                    </a>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Open in new tab"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 relative bg-slate-100 overflow-auto">
                {fileType === 'pdf' ? (
                    <iframe
                        src={`${url}#toolbar=0&navpanes=0&scrollbar=1`}
                        className="w-full h-full border-none bg-slate-100"
                        title={title || 'PDF Document'}
                    />
                ) : (
                    <div className="p-3 md:p-8 min-w-max">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <table className="w-full text-sm text-left border-collapse">
                                <tbody>
                                    {excelData.map((row, rIdx) => (
                                        <tr key={rIdx} className={rIdx === 0 ? "bg-slate-50 border-b border-slate-200" : "border-b border-slate-100 last:border-0"}>
                                            {row.map((cell, cIdx) => (
                                                <td
                                                    key={cIdx}
                                                    className={`px-4 py-3 min-w-[120px] ${rIdx === 0 ? "font-bold text-slate-700" : "text-slate-600"}`}
                                                >
                                                    {cell?.toString() || ''}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {excelData.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <TableIcon className="w-12 h-12 mb-4 opacity-20" />
                                <p>No data found in this spreadsheet</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Status Bar (Optional) */}
            <div className="px-4 py-1.5 bg-slate-800 text-[10px] text-slate-500 flex justify-between shrink-0">
                <span>{fileType.toUpperCase()} Preview Mode</span>
                {fileType === 'excel' && <span>{excelData.length} Rows detected</span>}
            </div>
        </div>
    );
};

export default PDFReader;
