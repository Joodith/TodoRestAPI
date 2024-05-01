import http from "../http-common";
const getTodos = () => {
  return http.get("/");
};

const getTodo = (id) => {
  return http.get(`/${id}`);
};

const addTodo = (data) => {
  return http.post("/", data);
};

const updateTodo = (id, data) => {
  return http.put(`/${id}`, data);
};

const deleteTodo = (id) => {
  return http.delete(`/${id}`);
};
const todoServices = {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
export default todoServices;
