'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { Book } from '@/types';
import { BookOpen, Calendar, FileText, ShoppingCart, Star } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface ProductDetailProps {
  book: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetail = ({ book, open, onOpenChange }: ProductDetailProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(book);
    toast.success('Added to cart', {
      description: `${book.title} has been added to your cart.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center md:text-left">
            {book.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center md:text-left text-muted-foreground">
            by {book.author}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
          {/* Book Cover */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="aspect-2/3 w-4/5 sm:w-3/4 md:w-full bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="text-white text-center p-6">
                <BookOpen className="h-14 w-14 mx-auto mb-3" />
                <p className="font-semibold text-lg sm:text-xl mb-1">{book.title}</p>
                <p className="text-xs sm:text-sm opacity-90">{book.author}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      i < Math.floor(book.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-sm sm:text-base">{book.rating}</span>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-3 space-y-5">
            {/* Category & Format */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="secondary">{book.category}</Badge>
              <Badge variant="outline">{book.format}</Badge>
            </div>

            {/* Price */}
            <div className="text-center md:text-left">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                ${book.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-1 text-center md:text-left">Description</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center md:text-left">
                {book.description}
              </p>
            </div>

            <Separator />

            {/* Book Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-center md:text-left">Book Information</h3>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Pages</p>
                    <p className="font-medium">{book.pages}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Published</p>
                    <p className="font-medium">{book.publishedYear}</p>
                  </div>
                </div>

                <div className="col-span-2 text-center md:text-left">
                  <p className="text-muted-foreground">ISBN</p>
                  <p className="font-medium font-mono text-xs break-all">{book.isbn}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Add to Cart Button */}
            <div className="flex flex-col gap-2">
              <Button size="lg" onClick={handleAddToCart} className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Available in {book.format} • Instant download after purchase
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
