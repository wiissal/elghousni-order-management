import { create } from "zustand";

const useStore = create((set) => ({
  // State
  orders: [],             // Array to store all orders
  filter: "all",          // Current filter state
  activePart: "orderCard", // Current active part of the UI

  // Actions
  setOrder: (newOrder) =>
    set((state) => ({ orders: [...state.orders, newOrder] })), // Add a new order

  removeOrder: (id) =>
    set((state) => ({ orders: state.orders.filter((order) => order.id !== id) })), // Delete order

  setFilter: (filter) => set({ filter }),         // Update current filter
  setActivePart: (part) => set({ activePart: part }), // Switch which component is visible
}));

export default useStore;
