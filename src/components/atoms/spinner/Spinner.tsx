import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
    size?: 'sm' | 'base' | 'lg';
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
    size = 'base',
    className
}) => {
    const sizeStyles = {
        sm: 'h-4 w-4',
        base: 'h-6 w-6',
        lg: 'h-8 w-8',
    };

    return (
        <Loader2
            className={cn('animate-spin', sizeStyles[size], className)}
            aria-label="Loading"
        />
    );
};