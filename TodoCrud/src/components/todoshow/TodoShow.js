import { useEffect, useState } from "react";
import TodoList from "../todolist/TodoList";
import todoServices from "../../services/TodoService";

export default function TodoShow() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    retrieveTodos();
  }, []);

  function retrieveTodos() {
    todoServices
      .getTodos()
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div className="showTodoList">
        <TodoList todoItems={items} />
      </div>
      <a href="/addTodo">
        <button>ADD NEW</button>
      </a>
    </div>
  );
}
