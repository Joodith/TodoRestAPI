import { useState } from "react";
import TodoItem from "../todoitem/TodoItem";

export default function TodoList({ todoItems }) {
  const displayTodoItems = todoItems.map((item, index) => {
    return <TodoItem itemName={item.todo} itemKey={item.id} />;
  });
  const showMsgWhenNoTodos =
    todoItems.length > 0 ? "" : "Nothing to do buddy. Sleep!!";
  return (
    <div className="todolist">
      <p className="noTodosMsg">{showMsgWhenNoTodos}</p>
      <br />
      <ul data-testid="todo_list">
        {displayTodoItems}
        <hr />
      </ul>
    </div>
  );
}
