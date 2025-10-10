import "../App.css";

function Sidebar() {
  // Function to scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        <li onClick={() => scrollToSection("dashboard")}>Dashboard</li>
        <li onClick={() => scrollToSection("orders")}>Orders</li>
        <li onClick={() => scrollToSection("products")}>Products</li>
      </ul>
    </div>
  );
}

export default Sidebar;
