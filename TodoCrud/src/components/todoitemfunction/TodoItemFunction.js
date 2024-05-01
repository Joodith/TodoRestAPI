import { useNavigate, useParams } from "react-router-dom";
import todoServices from "../../services/TodoService";
import { useEffect, useState } from "react";

export default function TodoItemFunction() {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialTodo = {
    id: null,
    todo: "",
    completed: false,
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodo);
  const [message, setMessage] = useState("");
  const actionDone = message.length > 0 ? true : false;
  function getTodoById(id) {
    console.log("id is " + id);
    todoServices
      .getTodo(id)
      .then((response) => {
        console.log(response.data);
        setCurrentTodo(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    if (id) getTodoById(id);
  }, [id]);
  function updateTodo() {
    let data = {
      id: currentTodo.id,
      todo: currentTodo.todo,
      completed: currentTodo.completed,
    };
    todoServices
      .updateTodo(currentTodo.id, data)
      .then((response) => {
        setCurrentTodo(response.data);
        setMessage("Todo updated successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function deleteTodo() {
    todoServices
      .deleteTodo(currentTodo.id)
      .then((response) => {
        console.log(response);
        // setMessage("Todo deleted successfully");
        if (response.status === 204) {
          navigate("/todos");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  return (
    <div>
      {actionDone ? (
        <div>
          <h4>{message}</h4>
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
              value={currentTodo.todo}
              onChange={handleInputChange}
              name="todo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="completed">Todo Completed</label>
            <input
              type="checkbox"
              className="form-control"
              id="completed"
              required
              checked={currentTodo.completed}
              onChange={handleInputChange}
              name="completed"
            />
          </div>

          <button onClick={updateTodo}>Update</button>
          <button onClick={deleteTodo}>Delete</button>
        </div>
      )}
    </div>
  );
}
