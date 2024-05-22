import axios from "axios";
import TodoCreateForm from "./TodoCreateForm";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByTestId,
  getByText,
} from "@testing-library/react";
import todoServices from "../../services/TodoService";

jest.mock("axios");
describe("<TodoCreateForm />", () => {
  it("submits todo data when clicked add button", async () => {
    const postData = {
      data: {
        todo: "Workout",
        completed: false,
      },
    };
    const mockResponse = {
      data: {
        id: 1,
        todo: "Workout",
        completed: false,
      },
    };
    axios.post.mockResolvedValueOnce(mockResponse);
    render(<TodoCreateForm />);
    fireEvent.change(screen.getByLabelText("Todo"), {
      target: {
        value: postData.data.todo,
      },
    });
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Add Todo"));
    await checkIfAddingTodoIsSuccess(postData);
  });
});
async function checkIfAddingTodoIsSuccess(postData) {
  const actionMessage = await waitFor(() => screen.getByTestId("greeting"));
  const backButton = await waitFor(() => screen.getByText("BACK TO HOME"));
  expect(actionMessage.textContent).toBe("Todo added successfully!");
  expect(backButton).toBeVisible();
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(axios.post).toHaveBeenCalledWith("/", postData.data)
  );
}
