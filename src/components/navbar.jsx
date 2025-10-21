// Navbar.jsx
import { useLocation } from "react-router-dom";
import "../App.css";

function Navbar() {
  const location = useLocation();
  let id = null;

  if (location.pathname.includes("/orders/")) {
    id = location.pathname.split("/orders/")[1];
  } else if (location.pathname.includes("/products/")) {
    id = location.pathname.split("/products/")[1];
  }

  return (
    <header className="navbar">
      <h1 className="navbar-title">
        Coopérative Elghousni "Order Management System"
        {id && <span style={{ marginLeft: "10px" }}>| ID: {id}</span>} {/* Display ID if present */}
      </h1>
    </header>
  );
}

export default Navbar;
