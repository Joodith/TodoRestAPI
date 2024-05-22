import axios from "axios";
import TodoShow from "./TodoShow";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByTestId,
  getByText,
} from "@testing-library/react";

jest.mock("axios");
describe("<TodoShow />", () => {
  it("get todos through get axios request", async () => {
    const mockResponse = {
      data: [
        { id: 1, todo: "Learning React", completed: false },
        { id: 2, todo: "Workout", completed: false },
      ],
    };
    axios.get.mockResolvedValueOnce(mockResponse);
    render(<TodoShow />);
    await checkIfFetchingAllTodosIsSuccess();
  });
});
async function checkIfFetchingAllTodosIsSuccess() {
  const todoItemOne = await waitFor(() => screen.getByText("Learning React"));
  expect(todoItemOne).toBeVisible();
  const todoItemTwo = await waitFor(() => screen.getByText("Workout"));
  expect(todoItemTwo).toBeVisible();
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(axios.get).toHaveBeenCalledWith("/"));
}
