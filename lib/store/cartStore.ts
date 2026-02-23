'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/lib/types';
import { VAT_RATE } from '@/lib/constants';

interface CartState {
    items: CartItem[];
    couponCode: string | null;
    discount: number;
    // Computed (recalculated)
    addItem: (item: CartItem) => void;
    removeItem: (productId: string, variantId: string) => void;
    updateQuantity: (productId: string, variantId: string, quantity: number) => void;
    clearCart: () => void;
    applyCoupon: (code: string) => void;
    removeCoupon: () => void;
    getSubtotal: () => number;
    getVatAmount: () => number;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            couponCode: null,
            discount: 0,

            addItem: (item) =>
                set((state) => {
                    const existing = state.items.find(
                        (i) => i.productId === item.productId && i.variantId === item.variantId
                    );
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.productId === item.productId && i.variantId === item.variantId
                                    ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxStock) }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, item] };
                }),

            removeItem: (productId, variantId) =>
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.productId === productId && i.variantId === variantId)
                    ),
                })),

            updateQuantity: (productId, variantId, quantity) =>
                set((state) => ({
                    items:
                        quantity <= 0
                            ? state.items.filter(
                                (i) => !(i.productId === productId && i.variantId === variantId)
                            )
                            : state.items.map((i) =>
                                i.productId === productId && i.variantId === variantId
                                    ? { ...i, quantity: Math.min(quantity, i.maxStock) }
                                    : i
                            ),
                })),

            clearCart: () => set({ items: [], couponCode: null, discount: 0 }),

            applyCoupon: (code) => {
                // Mock coupon logic
                if (code.toUpperCase() === 'ERMAY10') {
                    set({ couponCode: code, discount: 10 });
                }
            },

            removeCoupon: () => set({ couponCode: null, discount: 0 }),

            getSubtotal: () => {
                const { items } = get();
                return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },

            getVatAmount: () => {
                const subtotal = get().getSubtotal();
                const { discount } = get();
                const discounted = subtotal * (1 - discount / 100);
                return discounted * VAT_RATE;
            },

            getTotal: () => {
                const subtotal = get().getSubtotal();
                const { discount } = get();
                const discounted = subtotal * (1 - discount / 100);
                return discounted + discounted * VAT_RATE;
            },

            getItemCount: () => {
                const { items } = get();
                return items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'ermay-cart',
        }
    )
);
