import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const Card = ({
  variant = 'standard',
  title,
  subtitle,
  children,
  footer,
  icon,
  iconColor,
  onClick,
  to,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  elevation = 'sm',
  status,
  ...props
}) => {
  // Base classes for all cards
  const baseClasses = `
    bg-white rounded-lg overflow-hidden
    ${elevation === 'none' ? 'border border-border' : 
      elevation === 'sm' ? 'border border-border shadow-sm' : 
      elevation === 'md' ? 'shadow-md' : 
      elevation === 'lg' ? 'shadow-lg' : ''}
    ${className}
  `;
  
  // Interactive card (clickable)
  if (variant === 'interactive') {
    const CardComponent = to ? Link : 'div';
    const interactiveProps = to 
      ? { to } 
      : { onClick, role: 'button', tabIndex: 0 };
    
    return (
      <CardComponent
        className={`${baseClasses} transition-all duration-200 hover:shadow-md cursor-pointer`}
        {...interactiveProps}
        {...props}
      >
        {(title || subtitle) && (
          <div className={`px-4 pt-4 pb-2 ${headerClassName}`}>
            {title && <h3 className="text-lg font-semibold text-text-primary">{title}</h3>}
            {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
          </div>
        )}
        <div className={`px-4 py-3 ${bodyClassName}`}>
          {children}
        </div>
        {footer && (
          <div className={`px-4 py-3 border-t border-border ${footerClassName}`}>
            {footer}
          </div>
        )}
      </CardComponent>
    );
  }
  
  // Data card (for metrics and data points)
  if (variant === 'data') {
    return (
      <div className={`${baseClasses}`} {...props}>
        <div className={`p-4 ${bodyClassName}`}>
          <div className="flex justify-between items-start">
            {icon && (
              <div className={`p-2 rounded-md ${iconColor || 'bg-blue-50'}`}>
                <Icon name={icon} size={20} className={iconColor ? 'text-white' : 'text-primary'} />
              </div>
            )}
            {status && (
              <div className={`
                inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                ${status === 'up' ? 'bg-emerald-50 text-success' : 
                  status === 'down' ? 'bg-red-50 text-danger' : 
                  status === 'neutral' ? 'bg-slate-50 text-text-secondary' : ''}
              `}>
                {status === 'up' && (
                  <>
                    <Icon name="TrendingUp" size={14} className="mr-1" />
                    <span>+12.5%</span>
                  </>
                )}
                {status === 'down' && (
                  <>
                    <Icon name="TrendingDown" size={14} className="mr-1" />
                    <span>-8.3%</span>
                  </>
                )}
                {status === 'neutral' && (
                  <>
                    <Icon name="Minus" size={14} className="mr-1" />
                    <span>0%</span>
                  </>
                )}
              </div>
            )}
          </div>
          
          {title && <h3 className="text-sm font-medium text-text-secondary mt-3">{title}</h3>}
          
          <div className="mt-2">
            {children}
          </div>
          
          {footer && (
            <div className={`mt-4 pt-3 border-t border-border ${footerClassName}`}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Alert card
  if (variant === 'alert') {
    const alertStyles = {
      info: 'border-l-4 border-l-info bg-sky-50',
      success: 'border-l-4 border-l-success bg-emerald-50',
      warning: 'border-l-4 border-l-warning bg-amber-50',
      danger: 'border-l-4 border-l-danger bg-red-50',
    };
    
    const alertIconStyles = {
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    };
    
    const alertType = props.alertType || 'info';
    
    return (
      <div 
        className={`rounded-lg ${alertStyles[alertType]} ${className}`}
        role="alert"
        {...props}
      >
        <div className="p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Icon 
                name={
                  alertType === 'info' ? 'Info' : 
                  alertType === 'success' ? 'CheckCircle' : 
                  alertType === 'warning'? 'AlertTriangle' : 'AlertCircle'
                } 
                className={alertIconStyles[alertType]}
                size={20}
              />
            </div>
            <div className="ml-3">
              {title && <h3 className="text-sm font-medium text-text-primary">{title}</h3>}
              <div className={`text-sm ${title ? 'mt-2' : ''} text-text-secondary`}>
                {children}
              </div>
              {footer && (
                <div className={`mt-3 ${footerClassName}`}>
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Dashboard card
  if (variant === 'dashboard') {
    return (
      <div className={`${baseClasses}`} {...props}>
        {(title || subtitle) && (
          <div className={`flex justify-between items-center px-4 py-3 border-b border-border ${headerClassName}`}>
            <div>
              {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
              {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
            </div>
            {props.headerAction && (
              <div>
                {props.headerAction}
              </div>
            )}
          </div>
        )}
        <div className={`p-4 ${bodyClassName}`}>
          {children}
        </div>
        {footer && (
          <div className={`px-4 py-3 border-t border-border bg-slate-50 ${footerClassName}`}>
            {footer}
          </div>
        )}
      </div>
    );
  }
  
  // Standard card (default)
  return (
    <div className={`${baseClasses}`} {...props}>
      {(title || subtitle) && (
        <div className={`px-4 pt-4 pb-2 ${headerClassName}`}>
          {title && <h3 className="text-lg font-semibold text-text-primary">{title}</h3>}
          {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
        </div>
      )}
      <div className={`px-4 py-3 ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`px-4 py-3 border-t border-border ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;