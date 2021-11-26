import { useState, useEffect } from "react";

const useForm = ({ values: initialValues, validations, formats }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    Object.keys(validations).reduce((obj, key) => {
      obj[key] = "";
      return obj;
    }, {})
  );
  const [isSubmittable, setIsSubmittable] = useState(false);

  const handleInput = (key) => (event) => {
    let { value } = event.target;
    let format = formats[key];
    if (format) value = format.formatter(value);
    if (value !== values[key])
      setValues({
        ...values,
        [key]: value,
      });
  };

  const handleFocus = (keys) => () => {
    if (typeof keys === "string") keys = [keys];
    let clearErrors = keys.reduce((obj, key) => {
      obj[key] = "";
      return obj;
    }, {});
    setErrors({ ...errors, ...clearErrors });
  };

  const handleBlur = (keys) => () => {
    if (typeof keys === "string") keys = [keys];
    let validationErrors = getErrorsFromValidations(keys);
    setErrors({ ...errors, ...validationErrors });
  };

  const getErrorsFromValidations = (keys) => {
    return keys.reduce((obj, key) => {
      let validation = validations[key];
      if (validation) {
        let { keys: valKeys, validator } = validation;
        let values = valKeys.map((valKey) => values[valKey]);
        let [isValid, message] = validator(...values);
        if (!isValid) obj[key] = message;
      }
      return obj;
    }, {});
  };

  const checkIfIsSubmittable = () => {
    let newErrors = getErrorsFromValidations(Object.keys(validations));
    let newIsSubmittable = Object.values(newErrors).length === 0;
    if (isSubmittable !== newIsSubmittable) setIsSubmittable(newIsSubmittable);
  };
  useEffect(checkIfIsSubmittable, [values]);

  return {
    values,
    errors,
    handleInput,
    handleFocus,
    handleBlur,
    isSubmittable,
  };
};

export default useForm;
