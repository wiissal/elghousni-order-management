// ✅ StatusBadge.jsx
import React from "react";

/**
 * StatusBadge Component
 * ---------------------
 * This component displays a colored badge
 * indicating the order's current status.
 *
 * Props:
 * - status: string ("pending" | "prepared" | "delivered")
 */

function StatusBadge({ status }) {
  // Convert status text to lowercase to avoid case issues
  const normalizedStatus = status?.toLowerCase();

  return (
    <span className={`status-badge ${normalizedStatus}`}>
      {normalizedStatus}
    </span>
  );
}

export default StatusBadge;
