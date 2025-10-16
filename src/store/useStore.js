import {create} from "zustand"; // Import the create function from zustand

const useStore = create((set) => ({
  // Create a store with initial state and actions
  orders: [], //aray to store all orders
  filter: "all", // Current filter state
  activePart: "orderCard", // Current active part of the UI which one is active now
  
  setOrder: (newOrder) =>
    set((state) => ({ orders: [...state.orders, newOrder] })), // Action to add a new order
  setFilter: (filter) => set({ filter }), // Action to set the filter
  setActivePart: (part) => set({ activePart: part }), // Action to set the active part
  removeOrder: (id) =>
  set((state) => ({
    orders: state.orders.filter((order) => order.id !== id),
  })),

}));

export default useStore; // Export the store for use in components
