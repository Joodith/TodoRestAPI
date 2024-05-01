const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 5000;
// let json = require("./todos.json");
function readJson() {
  let data = fs.readFileSync("todos.json");
  return JSON.parse(data);
}

app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/api/todos", async (req, res) => {
  let currentTodos = await readJson();
  let todoJSON = await readJson();
  let allTodos = todoJSON.allTodos;
  console.log(currentTodos.allTodos);
  res.json(allTodos);
});

app.get("/api/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.params.id);
  console.log(id);
  let todoJSON = await readJson();
  let allTodos = todoJSON.allTodos;
  const currentTodo = allTodos.find((item) => item.id === id);
  if (currentTodo) {
    res.json(currentTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.post("/api/todos", async (req, res) => {
  const { todo } = req.body;
  let todoJSON = await readJson();
  let allTodos = todoJSON.allTodos;
  const newTodo = { id: allTodos.length + 1, todo, completed: false };
  allTodos.push(newTodo);
  const newJsonData = JSON.stringify({ allTodos: allTodos });
  try {
    fs.writeFileSync("todos.json", newJsonData);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { todo, completed } = req.body;
  let todoJSON = await readJson();
  let allTodos = todoJSON.allTodos;
  let currentTodo = null;
  allTodos.forEach((element) => {
    if (element.id === id) {
      element.todo = todo;
      element.completed = completed;
      currentTodo = element;
    }
  });
  if (currentTodo) {
    const newJsonData = JSON.stringify({ allTodos: allTodos });
    try {
      fs.writeFileSync("todos.json", newJsonData);
      res.json(currentTodo);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let todoJSON = await readJson();
  let allTodos = todoJSON.allTodos;
  const newTodos = allTodos.filter((item) => item.id !== id);
  const newJsonData = JSON.stringify({ allTodos: newTodos });
  try {
    fs.writeFileSync("todos.json", newJsonData);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
  }
});
