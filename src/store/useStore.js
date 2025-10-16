import { create } from "zustand";

const useStore = create((set) => ({
  // STATE
  orders: [], // Array to store all orders
  filter: "all", // Current filter state
  activePart: "orderCard", // Which component is active (optional if using routing)

  // ACTIONS
  setOrder: (newOrder) =>
    set((state) => ({ orders: [...state.orders, newOrder] })), // Add a new order

  removeOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })), // Delete order

  updateOrder: (id, updatedFields) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, ...updatedFields } : o
      ),
    })), // Update order safely

  setFilter: (filter) => set({ filter }), // Update current filter
  setActivePart: (part) => set({ activePart: part }), // Switch which component is visible
}));

export default useStore;
