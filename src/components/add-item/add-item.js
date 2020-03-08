import React, { Component } from "react";

import "./add-item.css";

export default class AddItem extends Component {
  state = {
    label: ""
  };

  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: ""
    });
  };

  render() {
    return (
      <form className="add-item-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="e.g. task to do"
          value={this.state.label}
        ></input>
        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    );
  }
}
