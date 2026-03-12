import { create } from "zustand";

export const useThemeStore = create((set) => ({
    light: true,
    swichTheme: () => {
        set((state) => ({ light: !state.light }))
    }
}))

export const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null })
}))
