'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/types';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,

            login: async (email, password) => {
                set({ isLoading: true });
                // Simulate network delay
                await new Promise((resolve) => setTimeout(resolve, 800));

                if (email === 'test@ermaymobilya.com' && password === 'Test2026!') {
                    set({
                        user: {
                            id: 'USR-001',
                            email,
                            name: 'Test Kullanıcısı',
                            isDealer: false,
                        },
                        isLoading: false,
                    });
                    return true;
                }

                set({ isLoading: false });
                return false;
            },

            logout: () =>
                set({
                    user: null,
                }),
        }),
        {
            name: 'ermay-auth',
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);
