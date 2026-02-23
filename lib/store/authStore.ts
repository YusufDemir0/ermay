'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Dealer } from '@/lib/types';
import dealers from '@/data/dealers.json';

interface AuthState {
    user: User | null;
    isDealer: boolean;
    dealerData: Dealer | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isDealer: false,
            dealerData: null,
            isLoading: false,

            login: async (email, password) => {
                set({ isLoading: true });
                // Simulate network delay
                await new Promise((resolve) => setTimeout(resolve, 800));

                if (email === 'demo@ermaymobilya.com' && password === 'Demo2026!') {
                    // Load dealer data from mock
                    try {
                        const dealer = dealers.find((d: { email: string }) => d.email === email) as Dealer | undefined;
                        if (dealer) {
                            set({
                                user: {
                                    id: dealer.dealerId,
                                    email: dealer.email,
                                    name: dealer.contactName,
                                    isDealer: true,
                                },
                                isDealer: true,
                                dealerData: dealer as Dealer,
                                isLoading: false,
                            });
                            return true;
                        }
                    } catch {
                        // fallback if JSON not yet available
                        set({
                            user: {
                                id: 'DLR-001',
                                email,
                                name: 'Ahmet Yılmaz',
                                isDealer: true,
                            },
                            isDealer: true,
                            dealerData: null,
                            isLoading: false,
                        });
                        return true;
                    }
                }

                set({ isLoading: false });
                return false;
            },

            logout: () =>
                set({
                    user: null,
                    isDealer: false,
                    dealerData: null,
                }),
        }),
        {
            name: 'ermay-auth',
            partialize: (state) => ({
                user: state.user,
                isDealer: state.isDealer,
                dealerData: state.dealerData,
            }),
        }
    )
);
