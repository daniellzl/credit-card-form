import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const title = screen.getByText(/Enter Your Credit Card Information/i);
  expect(title).toBeInTheDocument();
});
