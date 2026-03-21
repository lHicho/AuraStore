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
    profile: null,
    updateProfileLocally: (updates) =>
        set((state) => ({
            profile: { ...(state.profile || {}), ...updates }
        })),
    refreshProfile: async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            set({ user: null, profile: null });
            return;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();

        if (error) {
            set({ user, profile: { ...(user.user_metadata || {}) } });
            return;
        }

        set({
            user,
            profile: {
                ...(user.user_metadata || {}),
                ...(data || {}),
                email: data?.email || user.email
            }
        });
    },
    setUser: async (user) => {
        console.log("Store: setUser with:", user?.email || "mock-user");
        set({ user });
        if (user && user.id && !user.id.startsWith('mock-')) { // Skip fetch for mock IDs
            console.log("Store: Fetching profile for authenticated user:", user.id);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();
            
            if (error) {
                console.warn("Store: Error fetching profile. This might occur if the profiles table doesn't exist yet.");
                set({ profile: { ...(user.user_metadata || {}), email: user.email } });
            } else {
                set({
                    profile: {
                        ...(user.user_metadata || {}),
                        ...(data || {}),
                        email: data?.email || user.email
                    }
                });
            }
        } else {
            console.log("Store: Using local user metadata (no external profile fetch).");
            set({ profile: null });
        }
    },
    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null });
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
