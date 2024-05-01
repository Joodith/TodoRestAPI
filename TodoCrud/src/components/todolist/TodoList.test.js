import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

describe("Diplay todos", () => {
  test("should show default message when there is no todos", () => {
    const defaultItems = [];
    render(<TodoList todoItems={defaultItems} />);
    const defaultMessage = screen.queryByText("Nothing to do buddy. Sleep!!");
    expect(defaultMessage).toBeVisible();
  });
});
