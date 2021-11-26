import { shallow } from "enzyme";
import ErrorBoundary from "./error-boundary.component.jsx";

it("expect to render Card component", () => {
  expect(shallow(<ErrorBoundary />)).toMatchSnapshot();
});
