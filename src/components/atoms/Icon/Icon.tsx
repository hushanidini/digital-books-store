import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
    icon: LucideIcon;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    className?: string;
    'aria-label'?: string;
}

export const Icon: React.FC<IconProps> = ({
    icon: IconComponent,
    size = 'base',
    className,
    'aria-label': ariaLabel,
}) => {
    const sizeStyles = {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        base: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8',
    };

    return (
        <IconComponent
            className={cn(sizeStyles[size], className)}
            aria-label={ariaLabel}
        />
    );
};