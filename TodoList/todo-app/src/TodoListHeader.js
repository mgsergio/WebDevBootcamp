import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './TodoListHeader.css'


export class TodoListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: true
    };
  }

  handleKeyPress(e) {
    if (e.key === "Enter" && e.target.value.length !== 0) {
      this.props.onEnterPress(e.target.value);
      e.target.value = "";
    }
  }

  handlePlusPress() {
    this.setState({ toggled: !this.state.toggled });
  }

  renderBar() {
    return (
      <div className="TodoList-Bar">
        <span className="TodoList-Logo">to-do list</span>
        <span
          className="TodoList-Plus"
          onClick={() => this.handlePlusPress()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    );
  }

  renderImput() {
    if (!this.state.toggled) {
      return;
    }

    return (
      <input
        type="text"
        className="TodoList-Input"
        placeholder="Add New Todo"
        onKeyPress={e => this.handleKeyPress(e)}
      >
      </input>
    );
  }

  render() {
    return (
      <div className="TodoList-Header">
        {this.renderBar()}
        {this.renderImput()}
      </div>
    );
  }
}
