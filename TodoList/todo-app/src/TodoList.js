import React from 'react';

import { TodoListHeader } from './TodoListHeader';
import { TodoListItem } from './TodoListItem';

import './TodoList.css';

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        mkItem('Item 1'),
        mkItem('Item 2'),
        mkItem('Item 3'),
        mkItem('Item 4'),
      ]
    };
  }

  markItemDone(index) {
    const items = this.state.items.slice();
    items[index] = { ...items[index], done: !items[index].done };
    this.setState({ items });
  }

  removeItem(index) {
    const items = [].concat(
      this.state.items.slice(0, index),
      this.state.items.slice(index + 1)
    );
    this.setState({ items });
  }

  addItem(text) {
    const items = this.state.items.slice();
    items.push(mkItem(text));
    this.setState({ items });
  }

  renderHeader() {
    return (
      <TodoListHeader
        onEnterPress={text => this.addItem(text)}
      >
      </TodoListHeader>
    );
  }

  renderItems() {
    return (
      Object.entries(this.state.items).map(([index, { text, done }]) =>
        <TodoListItem
          task={text}
          isEven={(Number(index) + 1) % 2 === 0}
          done={done}
          key={Number(index)}
          onTextClick={() => this.markItemDone(Number(index))}
          onTrashClick={() => this.removeItem(Number(index))}
        >
        </TodoListItem>
      )
    );
  }

  render() {
    return (
      <div className="TodoList">
        {this.renderHeader()}
        {this.renderItems()}
      </div>
    );
  }
}

function mkItem(text) {
  return {
    text,
    done: false
  }
}
