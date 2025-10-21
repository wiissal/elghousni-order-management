// FilterBar.jsx
import "../App.css";
import useStore from "../store/useStore";

function FilterBar() {
  const filter = useStore((state) => state.filter); // Get current filter from Zustand
  const setFilter = useStore((state) => state.setFilter); // Action to update filter

  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "active" : ""} // Shown if current filter is 'all'
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "pending" ? "active" : ""} // Shown if current filter is 'pending'
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>

      <button
        className={filter === "prepared" ? "active" : ""}
        onClick={() => setFilter("prepared")}
      >
        Prepared
      </button>

      <button
        className={filter === "delivered" ? "active" : ""}
        onClick={() => setFilter("delivered")}
      >
        Delivered
      </button>
    </div>
  );
}

export default FilterBar;
