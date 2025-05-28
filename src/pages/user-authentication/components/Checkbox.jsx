import React from "react";

const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2 focus:outline-none"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-text-secondary">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;