import { shallow } from "enzyme";
import CreditCardForm from "./credit-card-form.component.jsx";

it("expect to render CreditCardForm component", () => {
  expect(shallow(<CreditCardForm />)).toMatchSnapshot();
});
