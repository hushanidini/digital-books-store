'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Global Error Handler
 * Catches errors in the root layout
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Critical Error</h1>
                        <p className="text-gray-600 mb-6">
                            A critical error occurred. Please refresh the page.
                        </p>
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mb-6 p-4 bg-red-50 rounded text-left">
                                <p className="text-sm text-red-800 font-mono wrap-break-word">
                                    {error.message}
                                </p>
                            </div>
                        )}
                        <button
                            onClick={reset}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}