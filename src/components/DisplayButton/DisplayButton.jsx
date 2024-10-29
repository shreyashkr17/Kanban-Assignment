// src/components/DisplayButton.js
import React, { useState } from 'react';
import './DisplayButton.css';

import { useEffect } from 'react';

function DisplayButton({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest('.display-button-container')) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="display-button-container">
      <button 
        className="display-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/assets/Display.svg" alt="Display" /> <span>Display</span> <img src="/assets/down.svg" alt="down" />
      </button>
      
      {isOpen && (
        <div className="options-dropdown">
          <div className="option-group">
            <label>Grouping</label>
            <select 
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          
          <div className="option-group">
            <label>Ordering</label>
            <select 
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayButton;
