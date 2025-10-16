import { create } from "zustand";

const useStore = create((set) => ({
  orders: [],
  products: [],   // New: products array
  filter: "all",

  // Orders actions
  setOrder: (newOrder) =>
    set((state) => ({ orders: [...state.orders, newOrder] })),
  removeOrder: (id) =>
    set((state) => ({ orders: state.orders.filter(o => o.id !== id) })),
  updateOrderQuantity: (productName, quantity) =>
    set((state) => ({
      orders: state.orders.map(o =>
        o.product === productName ? { ...o, quantity } : o
      ),
    })),

  // Products actions
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
    })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter(p => p.id !== id)
    })),

  setFilter: (filter) => set({ filter }),
}));

export default useStore;
