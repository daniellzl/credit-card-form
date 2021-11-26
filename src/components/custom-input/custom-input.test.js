import { shallow } from "enzyme";
import CustomInput from "./custom-input.component.jsx";

it("expect to render CustomInput component", () => {
  expect(shallow(<CustomInput />)).toMatchSnapshot();
});
