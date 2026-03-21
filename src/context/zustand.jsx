import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "./supabase";

export const useThemeStore = create(
    persist(
        (set) => ({
            light: true,
            swichTheme: () => {
                set((state) => ({ light: !state.light }))
            }
        }),
        {
            name: "theme-storage"
        }
    )
)

export const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
    }
}))

export const useCartStore = create((set) => ({
    cart: [],
    
    addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
            return {
                cart: state.cart.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
    })),

    updateQuantity: (id, delta) => set((state) => ({
        cart: state.cart.map(item => 
            item.id === id 
                ? { ...item, quantity: Math.max(1, Math.min(item.limit || 10, item.quantity + delta)) }
                : item
        )
    })),

    clearCart: () => set({ cart: [] }),

    getCartTotal: (state) => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    getCartCount: (state) => state.cart.reduce((count, item) => count + item.quantity, 0)
}))

export const useLocationStore = create(
    persist(
        (set) => ({
            city: "Casablanca",
            setCity: (city) => set({ city })
        }),
        {
            name: "location-storage"
        }
    )
)
