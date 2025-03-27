import React from "react";

/**
 * SelectStatus component for filtering items by status (active/inactive)
 * @param {Object} props - Component props
 * @param {string} props.value - Current selected value
 * @param {Function} props.onChange - Function to call when selection changes
 * @returns {React.ReactNode} - Rendered component
 */
const SelectStatus = ({ value, onChange }) => {
  return (
    <div className="flex items-center ml-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-1 rounded-md border  shadow-lg shadow-purple-200  border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-50"
      >
        <option value="all">Todos</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </select>
    </div>
  );
};

export default SelectStatus;
