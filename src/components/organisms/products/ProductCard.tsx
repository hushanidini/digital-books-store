
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { Book } from '@/types';
import { ShoppingCart, Star } from 'lucide-react';
import React, { useState } from 'react';
import { ProductDetail } from './ProductDetail';
import { toast } from "sonner"

interface ProductCardProps {
    book: Book;
}

export const ProductCard = ({ book }: ProductCardProps) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const addToCart = useCartStore((state) => state.addToCart);


    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(book);

        toast.success("Added to cart", {
            description: `${book.title} has been added to your cart.`,
        })
    };

    return (
        <>
            <Card
                className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full flex flex-col"
                onClick={() => setIsDetailOpen(true)}
            >
                {/* Book Cover Image */}
                <div className="relative aspect-2/3 overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Placeholder image - replace with actual book cover */}
                    <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-center p-4">
                            <p className="font-bold text-lg mb-2">{book?.title}</p>
                            <p className="text-sm opacity-90">{book?.author}</p>
                        </div>
                    </div>

                    {/* Format Badge */}
                    <Badge className="absolute top-2 right-2 z-20">
                        {book?.format}
                    </Badge>

                    {/* Rating */}
                    <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{book?.rating}</span>
                    </div>
                </div>

                <CardContent className="p-4 grow">
                    {/* Category */}
                    <p className="text-xs text-muted-foreground mb-2">{book?.category}</p>

                    {/* Title */}
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2">
                        {book?.title}
                    </h3>

                    {/* Author */}
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                        {book?.author}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                            ${book?.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {book?.pages} pages
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Button
                        className="w-full"
                        onClick={handleAddToCart}
                        size="sm"
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>

            {/* Product Detail Modal */}
            <ProductDetail
                book={book}
                open={isDetailOpen}
                onOpenChange={setIsDetailOpen}
            />
        </>
    );
};