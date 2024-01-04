import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Car } from "./components/CarCard/CarCard";

interface State {
  items: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: number) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      items: [],
      addToFavorites: (car: Car) =>
        set((state) => ({ items: [...state.items, car] })),
      removeFromFavorites: (carId: number) =>
        set((state) => ({
          items: state.items.filter((car: Car) => car.id !== carId),
        })),
    }),
    {
      name: "car-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
