import React from 'react';

import { TodoListHeader } from './TodoListHeader';
import { TodoListItem } from './TodoListItem';

import './TodoList.css';

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { text: 'Item 1', done: false },
        { text: 'Item 2', done: false },
        { text: 'Item 3', done: false },
        { text: 'Item 4', done: false },
      ]
    };
  }

  handleItemClick(index) {
    const items = this.state.items.slice();
    items[index] = { ...items[index], done: !items[index].done };
    this.setState({ items });
  }

  render() {
    return (
      <div className="TodoList">
        <TodoListHeader></TodoListHeader>
        {Object.entries(this.state.items).map(([index, { text, done }]) =>
          <TodoListItem
            task={text}
            isEven={(Number(index) + 1) % 2 === 0}
            done={done}
            key={Number(index)}
            onClick={() => this.handleItemClick(Number(index))}
          >
          </TodoListItem>
        )}
      </div>
    );
  }
}
