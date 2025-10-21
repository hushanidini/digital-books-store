'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Error Boundary Component
 * Catches and handles runtime errors in this application
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">Something went wrong!</CardTitle>
                    <CardDescription>
                        An unexpected error occurred. We apologize for the inconvenience.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Error Details (only in development) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-mono text-destructive wrap-break-word">
                                {error.message}
                            </p>
                            {error.digest && (
                                <p className="text-xs text-muted-foreground mt-2">
                                    Error ID: {error.digest}
                                </p>
                            )}
                        </div>
                    )}

                    <p className="text-sm text-muted-foreground text-center">
                        Please try refreshing the page or return to the home page.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button
                        onClick={reset}
                        className="w-full"
                        size="lg"
                    >
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="w-full"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Back to Home
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}