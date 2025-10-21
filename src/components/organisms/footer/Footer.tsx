import React from 'react';
import { Text } from '@/components/atoms/typography';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-muted/30 py-8">
      <div className="container px-4 text-center md:px-8">
        <Text size="sm" variant="muted">
          © 2025 Digital Books Store. All rights reserved.
        </Text>
        <Text size="sm" variant="muted" className="mt-2">
          Instant download • All formats • Secure payment
        </Text>
      </div>
    </footer>
  );
};