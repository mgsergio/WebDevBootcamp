import React from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


class TodoList extends React.Component {
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

function TodoListHeader() {
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

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  renderTrash() {
    const classModifier = this.state.hovered
      ? "TodoList-ItemTrash_shown"
      : "TodoList-ItemTrash_hidden";

    return (
      <div className={`TodoList-ItemTrash ${classModifier}`} >
        <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    );
  }

  renderText() {
    const classEven = this.props.isEven ? "TodoList-ItemTask_even" : "";
    const classDone = this.props.done ? "TodoList-ItemTask_done" : "";

    return (
      <div
        className={`TodoList-ItemTask ${classEven} ${classDone}`.trim()}
        onClick={this.props.onClick}
      >
        {this.props.task}
      </div>
    );
  }

  // const onMouseLeave;
  render() {
    return (
      <div
        className="TodoList-Item"
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        {this.renderTrash()}
        {this.renderText()}
      </div >
    );
  }
}

// <input type="text" className="TodoList-AddInput"></input>

function App() {
  return (
    <div className="App">
      <TodoList></TodoList>
    </div>
  );
}

export default App;
