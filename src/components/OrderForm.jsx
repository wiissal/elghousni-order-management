// We import useState from React to use and change data inside the form
import { useState } from "react";

// We import our main CSS file for styling
import "../App.css";

// This component is for creating a new order
// It gets a function (onAddOrder) from the parent to send new orders back
function OrderForm({ onAddOrder }) {

  // Here we create 3 pieces of state to store what the user writes or selects
  const [customerName, setCustomerName] = useState("");  // to store customer name
  const [selectedProduct, setSelectedProduct] = useState("");  // to store chosen product
  const [quantity, setQuantity] = useState(1);  // default quantity is 1 for the product

  // This function runs when we click the "Add Order" button
  const handleSubmit = (e) => { // e is the event object for the form submission
    e.preventDefault(); // stop the page from refreshing

    // Check if all fields are filled
    if (!customerName || !selectedProduct) {
      alert("Please fill your information!");
      return; // if not filled, stop here
    }

    // Create a new order object
    const newOrder = {
      id: Date.now(), // gives a unique ID for each order
      customerName, // the name the user wroten
      product: selectedProduct, // the product chosen
      quantity, // how many items
      status: "pending", // every new order starts as pending
    };

    // Send this new order to the parent component
    onAddOrder(newOrder);

    // Reset form after adding the order so its empty for next one and the client  can add another order with informations 
    setCustomerName("");
    setSelectedProduct("");
    setQuantity(1);
  };
  //all this app is behind  the sceene of the form tag
  // What the user sees on the screen (the form)
  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Create New Order</h2>

      {/* Customer name input */}
      <label>Customer Name:</label>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)} // update the name as the user types
        placeholder="Enter customer name"
      />

      {/* Product select menu */}
      <label>Product:</label>
      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)} // update the product when selected
      >
        <option value="">-- Select a product --</option>
        <option value="Olive Oil 750ml">Olive Oil 750ml</option>
        <option value="Olive Oil 1L">Olive Oil 1L</option>
        <option value="Beldi Olives">Beldi Olives</option>
        <option value="Honey">Honey natural</option>
        <option value="Olive Oil Soap">Olive Oil Soap</option>
        <option value="Olive Jam">Olive Jam</option>
        <option value="Black Olive Tapenade">Black Olive Tapenade</option>
        <option value="Marinated Beldi Olives">Marinated Beldi Olives</option>
      </select>

      {/* Quantity input */}
      <label>Quantity:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))} // update quantity as the user changes number
      />

      {/* Submit button */}
      <button type="submit">Add Order</button>
    </form>
  );
}

// We export the component so we can use it in other files (like App.jsx)
export default OrderForm;
