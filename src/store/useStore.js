// src/store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  // STATE
  orders: [],             // Array to store all orders
  filter: "all",          // Current filter state
  activePart: "orderCard", // Current active UI part

  products: [],           // Optional: store products if needed

  // ACTIONS
  // Add a new order
  setOrder: (newOrder) => {/*new order is a parameter*/
    set((state) => ({ orders: [...state.orders, newOrder] }))
  },

  // Remove an order by ID
  removeOrder: (id) => /* delete an order by ID */
    set((state) => ({ orders: state.orders.filter((order) => order.id !== id) })),

  // Update the filter (all, pending, prepared, delivered)
  setFilter: (filter) => set({ filter }),

  // Switch the active part of the UI
  setActivePart: (part) => set({ activePart: part }),

  // Optional: add a product
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  //  remove a product by ID
  removeProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
}));

export default useStore;
