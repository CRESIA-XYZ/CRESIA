import { create } from 'zustand';
import { CartItem, Customer, Order, WishlistItem, Product } from '@/types';

interface Store {
  cart: CartItem[];
  wishlist: WishlistItem[];
  customer: Partial<Customer> | null;
  orders: Order[];
  addToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setCustomer: (customer: Partial<Customer>) => void;
  addOrder: (order: Order) => void;
  getOrders: () => Order[];
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  wishlist: [],
  customer: null,
  orders: [],

  addToCart: (product, quantity, selectedSize, selectedColor) =>
    set((state) => {
      const existing = state.cart.find(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return {
        cart: [...state.cart, { product, quantity, selectedSize, selectedColor }],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),

  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ),
    })),

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },

  getCartCount: () => {
    const state = get();
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  },

  addToWishlist: (productId) =>
    set((state) => {
      if (state.wishlist.some((item) => item.productId === productId)) {
        return state;
      }
      return {
        wishlist: [...state.wishlist, { productId, addedAt: new Date() }],
      };
    }),

  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.productId !== productId),
    })),

  isInWishlist: (productId) => {
    const state = get();
    return state.wishlist.some((item) => item.productId === productId);
  },

  setCustomer: (customer) => set({ customer }),

  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),

  getOrders: () => {
    const state = get();
    return state.orders;
  },
}));
