import { renderHook } from "@testing-library/react-hooks";
import useForm from "./use-form.hook.js";

describe("useForm", () => {
  it("executable with empty inputs", () => {
    const { result } = renderHook(() =>
      useForm({ values: {}, errors: {}, validations: {}, formats: {} })
    );

    const {
      values,
      errors,
      handleInput,
      handleFocus,
      handleBlur,
      isSubmittable,
    } = result.current;

    expect(typeof values).toEqual("object");
    expect(typeof errors).toEqual("object");
    expect(typeof handleInput).toEqual("function");
    expect(typeof handleFocus).toEqual("function");
    expect(typeof handleBlur).toEqual("function");
    expect(typeof isSubmittable).toEqual("boolean");
  });
});
