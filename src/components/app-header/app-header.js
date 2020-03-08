import React from "react";
import "./app-header.css";

const AppHeader = ({ toDo, done }) => {
  return (
    <div className="app-header d-flex">
      <div>
        <h1>My TodoList</h1>
        <h2>
          {toDo} more to go, {done} done
        </h2>
      </div>
    </div>
  );
};

export default AppHeader;
