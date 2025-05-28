import React, { useState, forwardRef } from 'react';
import Icon from '../../components/AppIcon';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  name,
  id,
  required = false,
  disabled = false,
  readOnly = false,
  error,
  success,
  helperText,
  icon,
  iconPosition = 'left',
  clearable = false,
  className = '',
  variant = 'standard',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  const handleClear = () => {
    const event = {
      target: { name, value: '' }
    };
    if (onChange) onChange(event);
  };
  
  // Base classes
  const baseInputClasses = `
    block w-full rounded-md border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
    ${error ? 'border-danger text-danger focus:ring-danger' : 'border-border'}
    ${success ? 'border-success' : ''}
    ${disabled ? 'bg-slate-100' : 'bg-white'}
  `;
  
  // Padding classes based on icon position
  const paddingClasses = icon
    ? iconPosition === 'left' ?'pl-10 pr-3' :'pl-3 pr-10'
    : clearable
      ? 'pl-3 pr-10' :'px-3';
  
  // Combine all input classes
  const inputClasses = `
    ${baseInputClasses}
    ${paddingClasses}
    py-2 text-sm text-text-primary
    placeholder:text-text-tertiary
    ${className}
  `;
  
  // Search variant
  if (variant === 'search') {
    return (
      <div className="relative">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={18} className="text-text-tertiary" />
          </div>
          <input
            ref={ref}
            type="search"
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            placeholder={placeholder || 'Search...'}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={`${baseInputClasses} pl-10 pr-10 py-2 text-sm`}
            {...props}
          />
          {value && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <Icon name="X" size={16} className="text-text-tertiary hover:text-text-secondary" />
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-danger">{error}</p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-xs text-text-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
  
  // With validation (success/error)
  if (variant === 'with-validation') {
    return (
      <div>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name={icon} size={18} className={error ? 'text-danger' : success ? 'text-success' : 'text-text-tertiary'} />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Icon name={icon} size={18} className={error ? 'text-danger' : success ? 'text-success' : 'text-text-tertiary'} />
            </div>
          )}
          {!icon && (error || success) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Icon 
                name={error ? 'AlertCircle' : 'CheckCircle'} 
                size={18} 
                className={error ? 'text-danger' : 'text-success'} 
              />
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-danger">{error}</p>
        )}
        {success && !error && (
          <p className="mt-1 text-xs text-success">{success}</p>
        )}
        {!error && !success && helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-xs text-text-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
  
  // With icon
  if (variant === 'with-icon') {
    return (
      <div>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name={icon} size={18} className="text-text-tertiary" />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={inputClasses}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Icon name={icon} size={18} className="text-text-tertiary" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-danger">{error}</p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-xs text-text-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
  
  // Standard input
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={`${baseInputClasses} px-3 py-2 text-sm`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={handleClear}
            aria-label="Clear input"
          >
            <Icon name="X" size={16} className="text-text-tertiary hover:text-text-secondary" />
          </button>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-danger">{error}</p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="mt-1 text-xs text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;