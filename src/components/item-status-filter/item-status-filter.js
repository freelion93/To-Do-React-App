import React, { Component } from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
  submitStatus = e => {
    this.props.onStatus(e.target.innerText);
  };

  render() {
    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-info"
          onClick={this.submitStatus}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.submitStatus}
        >
          Active
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.submitStatus}
        >
          Done
        </button>
      </div>
    );
  }
}
