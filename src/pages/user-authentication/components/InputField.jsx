import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const InputField = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  required,
  icon,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name={icon} size={18} className="text-text-tertiary" />
          </div>
        )}
        <input
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-field ${
            icon ? "pl-10" : "pl-3"
          } ${
            isPasswordField ? "pr-10" : "pr-3"
          } ${
            error ? "border-danger focus:ring-danger" : ""
          }`}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon
              name={showPassword ? "EyeOff" : "Eye"}
              size={18}
              className="text-text-tertiary hover:text-text-secondary"
            />
          </button>
        )}
      </div>
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;