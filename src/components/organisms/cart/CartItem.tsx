
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/lib/store';
import { CartItem as CartItemType } from '@/types';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
    const { updateQuantity, removeFromCart } = useCartStore();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= 99) {
            updateQuantity(item.book.id, newQuantity);
        }
    };

    const itemTotal = item.book.price * item.quantity;

    return (
        <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
            {/* Book Cover Thumbnail */}
            <div className="w-16 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded shrink-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold text-center px-2">
                    {item.book.title.split(' ').slice(0, 2).join(' ')}
                </span>
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0">
                {/* Title & Author */}
                <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                    {item.book.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {item.book.author}
                </p>

                {/* Price & Quantity Controls */}
                <div className="flex items-center justify-between gap-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>

                        <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                            className="h-7 w-12 text-center text-sm"
                            min="1"
                            max="99"
                        />

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            disabled={item.quantity >= 99}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <p className="font-semibold text-sm">${itemTotal.toFixed(2)}</p>
                        {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                                ${item.book.price.toFixed(2)} each
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Remove Button */}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => removeFromCart(item.book.id)}
            >
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </div>
    );
};