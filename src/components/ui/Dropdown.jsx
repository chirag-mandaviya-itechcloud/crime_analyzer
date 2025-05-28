import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../components/AppIcon';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  label,
  required = false,
  className = '',
  variant = 'standard',
  searchable = false,
  multiple = false,
  clearable = false,
  loading = false,
  noOptionsMessage = 'No options available',
  renderOption,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchQuery('');
    }
  };
  
  const handleOptionClick = (option) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      const optionIndex = newValue.findIndex(item => item.value === option.value);
      
      if (optionIndex > -1) {
        newValue.splice(optionIndex, 1);
      } else {
        newValue.push(option);
      }
      
      onChange(newValue);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };
  
  const handleClearSelection = (e) => {
    e.stopPropagation();
    onChange(multiple ? [] : null);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && !isOpen) {
      setIsOpen(true);
    }
  };
  
  // Filter options based on search query
  const filteredOptions = searchQuery
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;
  
  // Determine selected option label to display
  const getSelectedLabel = () => {
    if (multiple) {
      if (!value || value.length === 0) return placeholder;
      if (value.length === 1) return value[0].label;
      return `${value.length} items selected`;
    } else {
      return value ? value.label : placeholder;
    }
  };
  
  // Check if an option is selected (for multiple select)
  const isOptionSelected = (option) => {
    if (!value) return false;
    if (multiple) {
      return Array.isArray(value) && value.some(item => item.value === option.value);
    }
    return value.value === option.value;
  };
  
  // Multi-select dropdown
  if (variant === 'multi-select' || multiple) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        
        <div
          className={`
            flex items-center justify-between w-full px-3 py-2 text-sm bg-white border rounded-md cursor-pointer
            ${error ? 'border-danger' : 'border-border'}
            ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'hover:border-slate-400'}
            ${isOpen ? 'ring-2 ring-primary border-transparent' : ''}
          `}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
            {Array.isArray(value) && value.length > 0 ? (
              value.map(item => (
                <div 
                  key={item.value} 
                  className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-text-primary rounded text-xs"
                >
                  {item.label}
                  <button
                    type="button"
                    className="ml-1 text-text-tertiary hover:text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(item);
                    }}
                    aria-label={`Remove ${item.label}`}
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))
            ) : (
              <span className="text-text-tertiary">{placeholder}</span>
            )}
          </div>
          
          <div className="flex items-center">
            {clearable && Array.isArray(value) && value.length > 0 && (
              <button
                type="button"
                className="text-text-tertiary hover:text-text-secondary mr-1"
                onClick={handleClearSelection}
                aria-label="Clear selection"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            {loading ? (
              <Icon name="Loader" size={16} className="text-text-tertiary animate-spin" />
            ) : (
              <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-text-tertiary" />
            )}
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-border max-h-60 overflow-auto">
            {searchable && (
              <div className="sticky top-0 p-2 bg-white border-b border-border">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-3 py-1.5 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {filteredOptions.length > 0 ? (
              <ul className="py-1" role="listbox">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`
                      px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                      ${isOptionSelected(option) ? 'bg-blue-50 text-primary' : 'text-text-primary hover:bg-slate-50'}
                    `}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={isOptionSelected(option)}
                  >
                    <div className="flex items-center">
                      {renderOption ? renderOption(option) : option.label}
                    </div>
                    {isOptionSelected(option) && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-2 text-sm text-text-tertiary">{noOptionsMessage}</div>
            )}
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-xs text-danger">{error}</p>
        )}
      </div>
    );
  }
  
  // Searchable dropdown
  if (variant === 'searchable' || searchable) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        
        <div
          className={`
            flex items-center justify-between w-full px-3 py-2 text-sm bg-white border rounded-md cursor-pointer
            ${error ? 'border-danger' : 'border-border'}
            ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'hover:border-slate-400'}
            ${isOpen ? 'ring-2 ring-primary border-transparent' : ''}
          `}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <span className={`block truncate ${!value ? 'text-text-tertiary' : 'text-text-primary'}`}>
            {getSelectedLabel()}
          </span>
          
          <div className="flex items-center">
            {clearable && value && (
              <button
                type="button"
                className="text-text-tertiary hover:text-text-secondary mr-1"
                onClick={handleClearSelection}
                aria-label="Clear selection"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            {loading ? (
              <Icon name="Loader" size={16} className="text-text-tertiary animate-spin" />
            ) : (
              <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-text-tertiary" />
            )}
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-border max-h-60 overflow-auto">
            <div className="sticky top-0 p-2 bg-white border-b border-border">
              <input
                ref={searchInputRef}
                type="text"
                className="w-full px-3 py-1.5 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {filteredOptions.length > 0 ? (
              <ul className="py-1" role="listbox">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`
                      px-3 py-2 text-sm cursor-pointer
                      ${isOptionSelected(option) ? 'bg-blue-50 text-primary' : 'text-text-primary hover:bg-slate-50'}
                    `}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={isOptionSelected(option)}
                  >
                    {renderOption ? renderOption(option) : option.label}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-2 text-sm text-text-tertiary">{noOptionsMessage}</div>
            )}
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-xs text-danger">{error}</p>
        )}
      </div>
    );
  }
  
  // Contextual dropdown
  if (variant === 'contextual') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        
        <div
          className={`
            flex items-center justify-between w-full px-3 py-2 text-sm bg-white border rounded-md cursor-pointer
            ${error ? 'border-danger' : 'border-border'}
            ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'hover:border-slate-400'}
            ${isOpen ? 'ring-2 ring-primary border-transparent' : ''}
          `}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <div className="flex items-center">
            {value && value.icon && (
              <Icon name={value.icon} size={16} className="mr-2 text-text-secondary" />
            )}
            <span className={`block truncate ${!value ? 'text-text-tertiary' : 'text-text-primary'}`}>
              {getSelectedLabel()}
            </span>
          </div>
          
          <div className="flex items-center">
            {clearable && value && (
              <button
                type="button"
                className="text-text-tertiary hover:text-text-secondary mr-1"
                onClick={handleClearSelection}
                aria-label="Clear selection"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            {loading ? (
              <Icon name="Loader" size={16} className="text-text-tertiary animate-spin" />
            ) : (
              <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-text-tertiary" />
            )}
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-border max-h-60 overflow-auto">
            {searchable && (
              <div className="sticky top-0 p-2 bg-white border-b border-border">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-3 py-1.5 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {filteredOptions.length > 0 ? (
              <ul className="py-1" role="listbox">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`
                      px-3 py-2 text-sm cursor-pointer
                      ${isOptionSelected(option) ? 'bg-blue-50 text-primary' : 'text-text-primary hover:bg-slate-50'}
                    `}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={isOptionSelected(option)}
                  >
                    <div className="flex items-center">
                      {option.icon && (
                        <Icon name={option.icon} size={16} className="mr-2 text-text-secondary" />
                      )}
                      {option.label}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-2 text-sm text-text-tertiary">{noOptionsMessage}</div>
            )}
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-xs text-danger">{error}</p>
        )}
      </div>
    );
  }
  
  // Filter dropdown
  if (variant === 'filter') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className={`
            flex items-center justify-between px-3 py-1.5 text-sm bg-white border rounded-md
            ${error ? 'border-danger' : 'border-border'}
            ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'hover:border-slate-400'}
            ${isOpen ? 'ring-2 ring-primary border-transparent' : ''}
          `}
          onClick={toggleDropdown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            <Icon name="Filter" size={14} className="mr-1.5 text-text-secondary" />
            <span className={`${!value ? 'text-text-secondary' : 'text-text-primary font-medium'}`}>
              {label || 'Filter'}
              {value && `: ${getSelectedLabel()}`}
            </span>
          </div>
          
          <div className="flex items-center ml-2">
            {clearable && value && (
              <button
                type="button"
                className="text-text-tertiary hover:text-text-secondary mr-1"
                onClick={handleClearSelection}
                aria-label="Clear filter"
              >
                <Icon name="X" size={14} />
              </button>
            )}
            <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-text-tertiary" />
          </div>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-48 mt-1 right-0 bg-white rounded-md shadow-lg border border-border max-h-60 overflow-auto">
            {searchable && (
              <div className="sticky top-0 p-2 bg-white border-b border-border">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-2 py-1 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {filteredOptions.length > 0 ? (
              <ul className="py-1" role="listbox">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`
                      px-3 py-1.5 text-sm cursor-pointer flex items-center
                      ${isOptionSelected(option) ? 'bg-blue-50 text-primary' : 'text-text-primary hover:bg-slate-50'}
                    `}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={isOptionSelected(option)}
                  >
                    {isOptionSelected(option) && (
                      <Icon name="Check" size={14} className="mr-1.5 text-primary" />
                    )}
                    {option.label}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-2 text-sm text-text-tertiary">{noOptionsMessage}</div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  // Standard dropdown (default)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <div
        className={`
          flex items-center justify-between w-full px-3 py-2 text-sm bg-white border rounded-md cursor-pointer
          ${error ? 'border-danger' : 'border-border'}
          ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'hover:border-slate-400'}
          ${isOpen ? 'ring-2 ring-primary border-transparent' : ''}
        `}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        <span className={`block truncate ${!value ? 'text-text-tertiary' : 'text-text-primary'}`}>
          {getSelectedLabel()}
        </span>
        
        <div className="flex items-center">
          {clearable && value && (
            <button
              type="button"
              className="text-text-tertiary hover:text-text-secondary mr-1"
              onClick={handleClearSelection}
              aria-label="Clear selection"
            >
              <Icon name="X" size={16} />
            </button>
          )}
          {loading ? (
            <Icon name="Loader" size={16} className="text-text-tertiary animate-spin" />
          ) : (
            <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-text-tertiary" />
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-border max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            <ul className="py-1" role="listbox">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`
                    px-3 py-2 text-sm cursor-pointer
                    ${isOptionSelected(option) ? 'bg-blue-50 text-primary' : 'text-text-primary hover:bg-slate-50'}
                  `}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={isOptionSelected(option)}
                >
                  {renderOption ? renderOption(option) : option.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-sm text-text-tertiary">{noOptionsMessage}</div>
          )}
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-danger">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;