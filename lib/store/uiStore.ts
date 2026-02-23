'use client';

import { create } from 'zustand';

interface UIState {
    isMobileMenuOpen: boolean;
    isSearchOpen: boolean;
    isFilterDrawerOpen: boolean;
    activeMegaMenu: string | null;
    setMobileMenu: (open: boolean) => void;
    setSearchOpen: (open: boolean) => void;
    setFilterDrawer: (open: boolean) => void;
    setActiveMegaMenu: (menu: string | null) => void;
}

export const useUIStore = create<UIState>()((set) => ({
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isFilterDrawerOpen: false,
    activeMegaMenu: null,

    setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
    setSearchOpen: (open) => set({ isSearchOpen: open }),
    setFilterDrawer: (open) => set({ isFilterDrawerOpen: open }),
    setActiveMegaMenu: (menu) => set({ activeMegaMenu: menu }),
}));
