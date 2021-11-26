import { shallow } from "enzyme";
import CustomInput from "./custom-input.component.jsx";

console.log(shallow(<CustomInput />).debug());

it("expect to render CustomInput component", () => {
  expect(shallow(<CustomInput />)).toMatchSnapshot();
});
