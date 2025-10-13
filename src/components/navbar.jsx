// Navbar.jsx
import "../App.css";
import Sidebar from "./Sidebar";

function navbar(prop) {
  return (
    <>
      <header className="navbar">
        <h1 className="navbar-title">
          Coopérative Elghousni "Order Management System"
        </h1>
      </header>
      <div style={{display:"flex"}}> {/* This div contains the sidebar and the main content */}
        <Sidebar setActivePart={prop.setActivePart} />
        {prop.children}
      </div>
    </>
  );
}

export default navbar;
