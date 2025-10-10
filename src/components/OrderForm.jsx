// OrderForm.jsx
import { useState } from "react";
import ProductSelector from "./ProductSelector";
import "../App.css";

function OrderForm({ onAddOrder }) {
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName || !selectedProduct) {
      alert("Please fill all fields!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customerName,
      product: selectedProduct,
      quantity,
      status: "pending",
    };

    onAddOrder(newOrder); // Add new order to App.jsx state
    setCustomerName(""); // Reset form
    setSelectedProduct("");
    setQuantity(1);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Create New Order</h2>

      <label>Customer Name:</label>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Enter customer name"
      />

      <ProductSelector
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      <label>Quantity:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button type="submit">Add Order</button>
    </form>
  );
}

export default OrderForm;
