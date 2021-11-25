import { useState } from "react";

const useForm = ({ values: initialValues, validations }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    Object.keys(validations).reduce((obj, key) => {
      obj[key] = "";
      return obj;
    }, {})
  );

  const handleInput = (key) => (event) => {
    const { value } = event.target;
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleBlur = (keys) => (event) => {
    if (typeof keys === "string") keys = [keys];

    let validationErrors = {};

    for (let key of keys) {
      let scopedValidations = validations[key];

      if (!scopedValidations || scopedValidations.length === 0) continue;

      validationErrors[key] = "";

      for (let validation of scopedValidations) {
        let { keys, validator } = validation;
        let mappedKeys = keys.map((argKey) => values[argKey]);
        let [isValid, message] = validator(...mappedKeys);

        if (!isValid) {
          validationErrors[key] = message;
          break;
        }
      }
    }

    setErrors({ ...errors, ...validationErrors });
  };

  const isValid = () => {
    let validationErrors = getValidationErrors();
    let noErrorsPresent = Object.values(validationErrors).every(
      (error) => error.length === 0
    );
    return noErrorsPresent;
  };

  const getValidationErrors = () => {
    let result = {};

    for (let [validationKey, scopedValidations] of Object.entries(
      validations
    )) {
      let isErrorFree = true;

      for (let validation of scopedValidations) {
        let { keys, validator } = validation;
        let mappedKeys = keys.map((key) => values[key]);
        let [isValid, message] = validator(...mappedKeys);
        if (!isValid) {
          isErrorFree = false;
          result[validationKey] = message;
          break;
        }
      }

      if (isErrorFree) result[validationKey] = "";
    }

    return result;
  };

  return [values, errors, handleInput, handleBlur, isValid];
};

export default useForm;
