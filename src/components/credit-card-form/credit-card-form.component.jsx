import { initialValues, validations } from "./credit-card-form.data.js";
import CustomInput from "../custom-input/custom-input.component.jsx";
import useForm from "../../hooks/useForm.js";
import CSS from "./credit-card-form.module.scss";

const CreditCardForm = () => {
  const [values, errors, handleInput, handleBlur, isValid] = useForm({
    values: initialValues,
    validations: validations,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form Submitted!");
    console.log(values);
  };

  return (
    <div className={CSS.creditCardFormFrame}>
      <form className={CSS.creditCardForm}>
        <div className={CSS.inputsFrame}>
          <CustomInput
            type="text"
            label="Name"
            value={values.name}
            handleInput={handleInput("name")}
            handleBlur={handleBlur("name")}
          />
          <div className={CSS.errorFrame}>{errors.name}</div>
        </div>
        <div className={CSS.inputsFrame}>
          <div className={CSS.cardNumberAndCvv2Frame}>
            <div className={CSS.cardNumberFrame}>
              <CustomInput
                type="text"
                maxLength="16"
                label="Card Number"
                value={values.cardNumber}
                handleInput={handleInput("cardNumber")}
                handleBlur={handleBlur(["cardNumber", "cardNumberAndCvv2"])}
              />
            </div>
            <div className={CSS.cvv2Frame}>
              <CustomInput
                type="text"
                maxLength="4"
                label="CVV2"
                value={values.cvv2}
                handleInput={handleInput("cvv2")}
                handleBlur={handleBlur(["cvv2", "cardNumberAndCvv2"])}
              />
            </div>
          </div>
          <div className={CSS.errorFrame}>
            {errors.cardNumber || errors.cvv2 || errors.cardNumberAndCvv2}
          </div>
        </div>
        <div className={CSS.inputsFrame}>
          <div className={CSS.expMonthAndYearFrame}>
            <div className={CSS.expMonthFrame}>
              <CustomInput
                type="text"
                maxLength="2"
                label="Exp. Month"
                value={values.expMonth}
                handleInput={handleInput("expMonth")}
                handleBlur={handleBlur(["expMonth", "expMonthAndYear"])}
              />
            </div>
            <div className={CSS.expYearFrame}>
              <CustomInput
                type="text"
                maxLength="4"
                label="Exp. Year"
                value={values.expYear}
                handleInput={handleInput("expYear")}
                handleBlur={handleBlur(["expYear", "expMonthAndYear"])}
              />
            </div>
          </div>
          <div className={CSS.errorFrame}>
            {errors.expYear || errors.expMonth || errors.expMonthAndYear}
          </div>
        </div>
        <div className={CSS.buttonFrame}>
          <input
            type="submit"
            value="Submit"
            className={`${CSS.button} ${isValid() ? "" : CSS.disabled}`}
            onClick={handleSubmit}
            disabled={!isValid()}
          />
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;