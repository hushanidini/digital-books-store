import React from 'react';
import { cn } from '@/lib/utils';

interface PriceProps {
    amount: number;
    currency?: string;
    size?: 'sm' | 'base' | 'lg' | 'xl';
    showCurrency?: boolean;
    className?: string;
}

export const Price: React.FC<PriceProps> = ({
    amount,
    currency = 'USD',
    size = 'base',
    showCurrency = true,
    className,
}) => {
    const sizeStyles = {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-xl',
        xl: 'text-3xl',
    };

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);

    return (
        <span className={cn('font-bold text-primary', sizeStyles[size], className)}>
            {showCurrency ? formattedPrice : `$${amount.toFixed(2)}`}
        </span>
    );
};