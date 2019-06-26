import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './TodoListItem.css'


export class TodoListItem extends React.Component {
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
    // TODO: Make transition from unmounted state:
    // i.e. unmount -> mount_hidden, mount_shown
    const classModifier = this.state.hovered
      ? "TodoList-ItemTrash_shown"
      : "TodoList-ItemTrash_hidden";

    return (
      <div
        className={`TodoList-ItemTrash ${classModifier}`}
        onClick={this.props.onTrashClick}
      >
        <FontAwesomeIcon
          icon={faTrashAlt}
          style={{ width: "40%" }} />
      </div>
    );
  }

  renderText() {
    const classEven = this.props.isEven ? "TodoList-ItemTask_even" : "";
    const classDone = this.props.done ? "TodoList-ItemTask_done" : "";

    return (
      <div
        className={`TodoList-ItemTask ${classEven} ${classDone}`.trim()}
        onClick={this.props.onTextClick}
      >
        {this.props.task}
      </div>
    );
  }

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
