import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";

describe("Display todo item", () => {
  test("should render an item", () => {
    const itemName = "Complete assignments";
    const key = "item_key_0";
    render(<TodoItem itemName={itemName} itemKey={key} />);
    const todoItem = screen.getByText(itemName);
    expect(todoItem).toBeInTheDocument();
  });
});
