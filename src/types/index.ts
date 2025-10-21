export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  category: string;
  pages: number;
  publishedYear: number;
  rating: number;
  isbn: string;
  format: "PDF" | "EPUB" | "MOBI" | "All Formats";
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
