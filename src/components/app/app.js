import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
  startId = 0;

  createItem = label => {
    return {
      label: label,
      important: false,
      done: false,
      id: this.startId++
    };
  };

  state = {
    todoData: [
      this.createItem("Drink Coffee"),
      this.createItem("Create App"),
      this.createItem("Go To Sleep")
    ]
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const returnVal = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: returnVal
      };
    });
  };

  addItem = text => {
    const newTask = this.createItem(text);
    this.setState(({ todoData }) => {
      const returnVal = [...todoData, newTask];
      return {
        todoData: returnVal
      };
    });
  };

  toogleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  toogleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toogleProperty(todoData, id, "important")
      };
    });
  };

  toogleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toogleProperty(todoData, id, "done")
      };
    });
  };

  render() {
    const doneCount = this.state.todoData.filter(el => el.done).length;
    const leftCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={leftCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onDone={this.toogleDone}
          onImportant={this.toogleImportant}
        />
        <div className="top-panel">
          <AddItem onAdd={this.addItem} />
        </div>
      </div>
    );
  }
}