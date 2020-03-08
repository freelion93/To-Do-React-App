import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
  state = {
    todoData: [],
    term: "",
    toShow: "All"
  };

  componentDidMount() {
    fetch("/allTasks", { method: "GET" })
      .then(response => response.json())
      .then(data => {
        data.forEach(element => {
          this.createItem(
            element.id,
            element.label,
            element.important,
            element.done
          );
        });
        this.setState(({ todoData }) => {
          return {
            todoData: data
          };
        });
      });
  }

  createItem = (id, label, important, done) => {
    return {
      id: id,
      label: label,
      important: important,
      done: done
    };
  };

  addItem = text => {
    this.setState(({ todoData }) => {
      const id = todoData.length + 1;
      const newTask = this.createItem(id, text, false, false);
      fetch("/newTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          label: newTask.label,
          important: newTask.important,
          done: newTask.done
        })
      });
      const returnVal = [...todoData, newTask];
      return {
        todoData: returnVal
      };
    });
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      fetch("/deleteTask/" + id, {
        method: "DELETE"
      });
      const returnVal = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: returnVal
      };
    });
  };

  toogleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };
    fetch("/updateTask/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        label: newItem.label,
        important: newItem.important,
        done: newItem.done
      })
    });

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

  search(items, term) {
    if (term.length > 0) {
      const x = items.filter(el =>
        el.label.toLowerCase().includes(term.toLowerCase())
      );
      return x;
    } else {
      return items;
    }
  }

  setFilter(items, show) {
    if (show === "Active") {
      const x = items.filter(el => el.done === false);
      return x;
    } else if (show === "Done") {
      const x = items.filter(el => el.done === true);
      return x;
    } else if (show === "Favorites") {
      const x = items.filter(el => el.important === true);
      return x;
    } else {
      return items;
    }
  }

  onTextFilter = text => {
    this.setState(({ term }) => {
      return {
        term: text
      };
    });
  };

  onStatusFilter = text => {
    this.setState(({ toShow }) => {
      return {
        toShow: text
      };
    });
  };

  render() {
    const { todoData, term, toShow } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const leftCount = todoData.length - doneCount;
    const visibleItems = this.setFilter(this.search(todoData, term), toShow);

    return (
      <div className="todo-app">
        <AppHeader toDo={leftCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onTextFilter} />
          <ItemStatusFilter onStatus={this.onStatusFilter} />
        </div>
        <TodoList
          todos={visibleItems}
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
