import { useState, useEffect } from "react";

const useForm = ({ values: initialValues, validations }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    Object.keys(validations).reduce((obj, key) => {
      obj[key] = "";
      return obj;
    }, {})
  );
  const [isSubmittable, setIsSubmittable] = useState();

  const handleInput = (key) => (event) => {
    const { value } = event.target;
    setValues({
      ...values,
      [key]: value,
    });
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
    let errorsPresent = Object.values(newErrors).some(
      (error) => error.length > 0
    );
    setIsSubmittable(!errorsPresent);
  };
  useEffect(checkIfIsSubmittable, [values]);

  return [values, errors, handleInput, handleBlur, isSubmittable];
};

export default useForm;
