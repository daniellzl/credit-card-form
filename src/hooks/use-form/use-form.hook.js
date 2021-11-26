import { useState, useEffect } from "react";

const useForm = ({ values: initialValues, validations, inputFilters }) => {
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
    let inputFilter = inputFilters[key];
    if (inputFilter) value = inputFilter.filterer(value);
    if (values[key] !== value)
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
      let scopedVals = validations[key];
      obj[key] = "";
      for (let val of scopedVals) {
        let { keys: valKeys, validator } = val;
        let mappedKeys = valKeys.map((valKey) => values[valKey]);
        let [isValid, message] = validator(...mappedKeys);
        if (isValid) continue;
        obj[key] = message;
        break;
      }
      return obj;
    }, {});
  };

  const checkIfIsSubmittable = () => {
    let newErrors = getErrorsFromValidations(Object.keys(validations));
    let newIsSubmittable = Object.values(newErrors).every(
      (error) => error.length === 0
    );
    if (isSubmittable !== newIsSubmittable) setIsSubmittable(newIsSubmittable);
  };
  useEffect(checkIfIsSubmittable, [values]);

  return [values, errors, handleInput, handleFocus, handleBlur, isSubmittable];
};

export default useForm;
