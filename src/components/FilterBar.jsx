import "../App.css";

function FilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <button
        className={currentFilter === "all" ? "active" : ""} // Highlight active filter
        onClick={() => onFilterChange("all")} // Change filter to "all"
      >
        All {/* Show all orders */}
      </button>

      <button
        className={currentFilter === "pending" ? "active" : ""} // Highlight active filter
        onClick={() => onFilterChange("pending")} // Change filter to "pending"
      >
        Pending
      </button>

      <button
        className={currentFilter === "prepared" ? "active" : ""} 
        onClick={() => onFilterChange("prepared")}
      >
        Prepared
      </button>

      <button
        className={currentFilter === "delivered" ? "active" : ""}
        onClick={() => onFilterChange("delivered")}
      >
        Delivered
      </button>
    </div>
  );
}

export default FilterBar;
