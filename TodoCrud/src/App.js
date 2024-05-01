import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import TodoShow from "./components/todoshow/TodoShow";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoCreateForm from "./components/todocreateform/TodoCreateForm";
import TodoItemFunction from "./components/todoitemfunction/TodoItemFunction";

export default function App() {
  return (
    <div className="Application">
      <Header />
      <div>
        <Routes>
          <Route path="/todos" element={<TodoShow />} />
          <Route path="/addTodo" element={<TodoCreateForm />} />
          <Route path="/todoItem/:id" element={<TodoItemFunction />} />
        </Routes>
      </div>
    </div>
  );
}
