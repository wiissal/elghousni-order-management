import { useState } from "react";
import "../App.css";
import { products } from "../data/products";
import useStore from "../store/useStore";

function OrderCard() {
  const [quantities, setQuantities] = useState({});
  const orders = useStore((state) => state.orders);
  const setOrder = useStore((state) => state.setOrder);
  const updateOrderQuantity = useStore((state) => state.updateOrderQuantity);

  const handleQuantityChange = (product, change) => {
    setQuantities((prev) => {
      const newQty = Math.max((prev[product.id] || 0) + change, 0);

      const existingOrder = orders.find((o) => o.product === product.name);

      if (existingOrder) {
        updateOrderQuantity(product.name, newQty); // ✅ immutably update store
      } else if (newQty > 0) {
        setOrder({
          id: Date.now(),
          customerName: "Guest",
          product: product.name,
          quantity: newQty,
          price: product.price,
          status: "pending",
        });
      }

      return { ...prev, [product.id]: newQty };
    });
  };

  return (
    <div className="order-card-container">
      {products.map((product) => (
        <div className="order-card" key={product.id}>
          <img src={product.image} alt={product.name} className="product-img" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price} MAD</p>

          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange(product, -1)}>-</button>
            <span>{quantities[product.id] || 0}</span>
            <button onClick={() => handleQuantityChange(product, 1)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderCard;
