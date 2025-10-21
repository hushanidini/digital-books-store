'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCartStore } from '@/lib/store';
import { ShoppingCart, Trash2 } from 'lucide-react';
import React from 'react';
import { CartItem } from './CartItem';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet  = ({ open, onOpenChange }: CartSheetProps) => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-md md:max-w-lg h-screen sm:h-auto overflow-hidden p-0"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <SheetHeader>
            <SheetTitle className="flex flex-wrap items-center gap-2 text-lg sm:text-xl">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
              {totalItems > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              )}
            </SheetTitle>
            <SheetDescription className="text-sm sm:text-base">
              {totalItems === 0
                ? 'Your cart is empty'
                : 'Review your items and proceed to checkout'}
            </SheetDescription>
          </SheetHeader>
        </div>

      
        <div className="flex-1 flex flex-col overflow-hidden">
          {totalItems === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8 sm:p-10">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mb-6">
                Add some books to get started
              </p>
              <Button onClick={() => onOpenChange(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <>
             
              <ScrollArea className="flex-1 px-6 py-4 overflow-auto max-h-[calc(100vh-220px)]">
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.book.id} item={item} />
                  ))}
                </div>
              </ScrollArea>

              <Separator className="mt-2" />

        
              <div className="p-6 bg-background border-t sticky bottom-0 z-10">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-bold mt-2">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="space-y-2 mt-4">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={clearCart}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-2">
                  Instant download available after purchase
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
