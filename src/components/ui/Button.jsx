import React from 'react';
import Icon from '../../components/AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ariaLabel,
  ...props
}) => {
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-5 py-2.5 text-base',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary-dark focus:ring-primary disabled:bg-slate-300',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400 focus:ring-slate-300 disabled:bg-slate-100 disabled:text-slate-400',
    danger: 'bg-danger text-white hover:bg-red-500 active:bg-red-700 focus:ring-red-500 disabled:bg-slate-300',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-200 disabled:text-slate-300 disabled:hover:bg-transparent',
    icon: 'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-200 p-2 disabled:text-slate-300 disabled:hover:bg-transparent',
  };
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;
  
  // For icon-only buttons
  if (variant === 'icon') {
    return (
      <button
        type={type}
        className={buttonClasses}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel || 'Button'}
        {...props}
      >
        {icon && <Icon name={icon} size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} />}
      </button>
    );
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Icon 
          name={icon} 
          size={size === 'small' ? 16 : size === 'medium' ? 18 : 20} 
          className={children ? 'mr-2' : ''}
        />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon 
          name={icon} 
          size={size === 'small' ? 16 : size === 'medium' ? 18 : 20} 
          className={children ? 'ml-2' : ''}
        />
      )}
    </button>
  );
};

export default Button;