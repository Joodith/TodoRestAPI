import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

describe("Diplay todos", () => {
  test("should show default message when there is no todos", () => {
    const defaultItems = [];
    render(<TodoList todoItems={defaultItems} />);
    const defaultMessage = screen.queryByText("Nothing to do buddy. Sleep!!");
    expect(defaultMessage).toBeVisible();
  });
  test("should display all todos ", () => {
    const items = [
      { id: 1, todo: "Learning React", completed: false },
      { id: 2, todo: "Workout", completed: false },
    ];
    render(<TodoList todoItems={items} />);
    const displayTodoItems = document.querySelectorAll("li");
    expect(displayTodoItems.length).toEqual(2);
  });
});
