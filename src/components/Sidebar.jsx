import "../App.css"; // i will add styling separately in App.css  
function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        <li>Dashboard</li>
        <li>Orders</li>
        <li>Products</li>
      </ul>
    </div>
  );
}

export default Sidebar;
