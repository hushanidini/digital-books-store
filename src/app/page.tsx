
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';


import books from '@/data/books';
import { MainLayout } from '@/components/templates/mainLayout/MainLayout';
import { ProductCard } from '@/components/organisms/products';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Get unique categories from books
  const categories = useMemo(() => {
    const cats = Array.from(new Set(books.map((book) => book.category)));
    return ['all', ...cats.sort()];
  }, []);

  // Filter books based on search and category
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || book.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  return (
    <MainLayout>

      <section className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight tracking-tight">
            Digital Books Store
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl">
            Discover the best programming and tech books.<br className="hidden sm:block" />
            Instant download in multiple formats.
          </p>
        </div>
      </section>


      {/* Filters Section */}

      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 py-4 sm:py-6">
          {/* Top Row: Search + Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-wrap">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>

            {/* Category + Clear Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchQuery || categoryFilter !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                  }}
                  className="w-full sm:w-auto"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>
      </section>


      {/* Products Grid */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10">
        {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20">
            <p className="text-base sm:text-lg text-muted-foreground mb-4">
              No books found matching your criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div
            className="
        grid
        grid-cols-1
        xs:grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-4 sm:gap-6 lg:gap-8
        place-items-center
      "
          >
            {filteredBooks.map((book) => (
              <ProductCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}



