import { useState, useRef, useEffect } from 'react';
import './SearchableSelect.css';

const SearchableSelect = ({ options, value, onChange, placeholder, disabled, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`searchable-select-wrapper ${disabled ? 'disabled' : ''}`} ref={wrapperRef}>
      <div
        className="searchable-select-input-container"
        onClick={() => {
          if (!disabled && !isLoading) {
            setIsOpen(true);
          }
        }}
      >
        <input
          type="text"
          className="searchable-select-input"
          placeholder={isLoading ? '⏳ Loading...' : placeholder}
          value={isOpen ? searchTerm : displayValue}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          readOnly={disabled || isLoading}
        />
        <div className="searchable-select-arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {isOpen && !disabled && !isLoading && (
        <ul className="searchable-select-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt.value}
                className={`searchable-select-option ${opt.value === value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className="searchable-select-empty">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
