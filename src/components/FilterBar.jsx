import "../App.css";

function FilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All {/* Show all orders */}
      </button>

      <button
        className={currentFilter === "pending" ? "active" : ""}
        onClick={() => onFilterChange("pending")}
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
