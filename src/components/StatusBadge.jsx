// ✅ StatusBadge.jsx
import React from "react";

/**
 * StatusBadge Component
 * This component displays a colored badge indicating the order's current status.
 * props status: string ("pending" | "prepared" | "delivered")
 */

function StatusBadge({ status }) {
  // Convert status text to lowercase to avoid case issues
  const normalizedStatus = status?.toLowerCase(); // optional chaining to handle undefined/null

  return (
    <span className={`status-badge ${normalizedStatus}`}> {/* Dynamic class based on status */}
      {normalizedStatus}
    </span>
  );
}

export default StatusBadge;
