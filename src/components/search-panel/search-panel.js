import React, { Component } from "react";
import "./search-panel.css";

export default class Searchpanel extends Component {
  state = {
    inputText: ""
  };

  changeSearch = e => {
    const term = e.target.value;
    this.setState({
      inputText: term
    });
    this.props.onSearchChange(term);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.changeSearch}
        value={this.state.inputText}
      />
    );
  }
}
