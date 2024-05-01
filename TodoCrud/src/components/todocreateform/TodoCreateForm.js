import { useState } from "react";
import todoServices from "../../services/TodoService";

export default function TodoCreateForm() {
  const initialTodo = {
    id: null,
    todo: "",
    completed: false,
  };
  const [todoItem, setTodoItem] = useState(initialTodo);
  const [submitted, setSubmitted] = useState(false);
  function handleInputChange(event) {
    const { name, value } = event.target;
    setTodoItem({ ...todoItem, [name]: value });
  }
  async function saveTodo() {
    let data = {
      todo: todoItem.todo,
      completed: todoItem.completed,
    };

    todoServices
      .addTodo(data)
      .then((response) => {
        console.log(response);
        const addedTodo = {
          id: response.data.id,
          todo: response.data.todo,
          completed: response.data.completed,
        };
        setTodoItem(addedTodo);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const newTodo = () => {
    setTodoItem(initialTodo);
    setSubmitted(false);
  };
  return (
    <div>
      {submitted ? (
        <div>
          <h4>Todo added successfully!</h4>
          <a href="/todos">
            <button>BACK TO HOME</button>
          </a>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="todo">Todo</label>
            <input
              type="text"
              className="form-control"
              id="todo"
              required
              value={todoItem.todo}
              onChange={handleInputChange}
              name="todo"
            />
          </div>
          <button onClick={saveTodo}>Add Todo</button>
        </div>
      )}
    </div>
  );
}
