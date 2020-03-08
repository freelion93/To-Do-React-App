import React, { Component } from "react";

import "./add-item.css";

export default class AddItem extends Component {
  state = {
    label: "",
    warning: ""
  };

  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.label.length > 0) {
      this.props.onAdd(this.state.label);
      this.setState({
        label: ""
      });
    } else {
      this.setState({
        warning: "The goal must have at least one symbol!"
      });
      setTimeout(() => {
        this.setState({
          warning: ""
        });
      }, 3000);
    }
  };

  render() {
    return (
      <div>
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
        <div className="card-body warning">{this.state.warning}</div>
      </div>
    );
  }
}
