import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './TodoListHeader.css'


export function TodoListHeader() {
  return (
    <div className="TodoList-Header">
      <div className="TodoList-Bar">
        <span className="TodoList-Logo">to-do list</span>
        <span className="TodoList-Plus">
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
      <input
        type="text"
        className="TodoList-Input"
        placeholder="Add New Todo"
      >
      </input>
    </div>
  );
}
