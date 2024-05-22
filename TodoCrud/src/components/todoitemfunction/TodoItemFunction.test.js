import axios from "axios";
import TodoItemFunction from "./TodoItemFunction";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByTestId,
  getByText,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("axios");
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/todoItem/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};
describe("<TodoItemFunction />", () => {
  test("updates todo data when clicked update button", async () => {
    const initialData = {
      data: {
        id: 1,
        todo: "Workout",
        completed: false,
      },
    };
    const updateData = {
      data: {
        id: 1,
        todo: "Workout",
        completed: true,
      },
    };
    const mockResponse = {
      data: {
        id: 1,
        todo: "Workout",
        completed: true,
      },
    };
    axios.get.mockResolvedValueOnce(initialData);

    renderWithRouter(<TodoItemFunction />, { route: "/todoItem/1" });
    await checkIfGettingTodoIsSuccess(initialData);
    axios.put.mockResolvedValueOnce(mockResponse);
    fireEvent.change(screen.getByLabelText("Todo"), {
      target: {
        value: updateData.data.todo,
      },
    });
    fireEvent.click(screen.getByLabelText("Todo Completed"));
    expect(screen.getByText("Update")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Update"));
    await checkIfTodoUpdateIsSuccess(updateData);
  });

  test("deletes todo when delete button clicked", async () => {
    const initialData = {
      data: {
        id: 1,
        todo: "Workout",
        completed: false,
      },
    };

    async function checkIfDeletingTodoIsSuccess() {
      await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(axios.delete).toHaveBeenCalledWith("/1"));
    }

    axios.get.mockResolvedValueOnce(initialData);
    renderWithRouter(<TodoItemFunction />, { route: "/todoItem/1" });
    await checkIfGettingTodoIsSuccess(initialData);
    axios.delete.mockResolvedValueOnce();
    fireEvent.click(screen.getByText("Delete"));
    await checkIfDeletingTodoIsSuccess();
  });
});
async function checkIfTodoUpdateIsSuccess(updateData) {
  const actionMessage = await waitFor(() =>
    screen.getByText("Todo updated successfully")
  );
  const backButton = await waitFor(() => screen.getByText("BACK TO HOME"));
  expect(actionMessage).toBeVisible();
  expect(backButton).toBeVisible();
  await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(axios.put).toHaveBeenCalledWith("/1", updateData.data)
  );
}

async function checkIfGettingTodoIsSuccess(initialData) {
  await waitFor(() =>
    expect(screen.getByLabelText("Todo")).toHaveValue(initialData.data.todo)
  );
  if (initialData.data.completed) {
    await waitFor(() =>
      expect(screen.getByLabelText("Todo Completed")).toBeChecked()
    );
  } else {
    await waitFor(() =>
      expect(screen.getByLabelText("Todo Completed")).not.toBeChecked()
    );
  }
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  await waitFor(() => expect(axios.get).toHaveBeenCalledWith("/1"));
}
