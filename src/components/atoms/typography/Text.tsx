import React from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    variant?: 'default' | 'muted' | 'error' | 'success';
    className?: string;
    as?: 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({
    children,
    size = 'base',
    weight = 'normal',
    variant = 'default',
    className,
    as: Component = 'p',
}) => {
    const sizeStyles = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
    };

    const weightStyles = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const variantStyles = {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        error: 'text-destructive',
        success: 'text-green-600',
    };

    return (
        <Component
            className={cn(
                sizeStyles[size],
                weightStyles[weight],
                variantStyles[variant],
                className
            )}
        >
            {children}
        </Component>
    );
};