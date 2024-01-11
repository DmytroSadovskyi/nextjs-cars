import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Car } from "../types/car";

interface State {
  cars: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: number) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      cars: [],
      addToFavorites: (car: Car) =>
        set((state) => ({ cars: [...state.cars, car] })),
      removeFromFavorites: (carId: number) =>
        set((state) => ({
          cars: state.cars.filter((car: Car) => car.id !== carId),
        })),
    }),
    {
      name: "car-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
