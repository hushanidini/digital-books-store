'use client';
import React, { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to error reporting service
        console.error('Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="p-6 border border-destructive/50 bg-destructive/10 rounded-lg">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-destructive mb-1">
                                Component Error
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                {"This component encountered an error and couldn't be displayed."}
                            </p>
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <pre className="text-xs bg-muted p-2 rounded mb-3 overflow-auto">
                                    {this.state.error.message}
                                </pre>
                            )}
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => this.setState({ hasError: false, error: undefined })}
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}