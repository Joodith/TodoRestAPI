const mockResponse = {
  data: [
    {
      id: 1,
      todo: "Workout",
      completed: false,
    },
  ],
};
export default {
  // get: jest.fn((url) => {
  //   if (url === "http://localhost:5000/api/todos") {
  //     return Promise.resolve({
  //       data: mockResponse,
  //     });
  //   }
  // }),
  // post: jest.fn((url) => {
  //   if (url === "http://localhost:5000/api/todos") {
  //     return Promise.resolve({
  //       data: mockResponse.data[0],
  //     });
  //   }
  // }),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(function () {
    return this;
  }),
};
