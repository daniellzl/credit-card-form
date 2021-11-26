import validations from "./credit-card-form.validations.js";
import formats from "./credit-card-form.formats.js";
import CustomInput from "../custom-input/custom-input.component.jsx";
import useForm from "../../hooks/use-form/use-form.hook.js";
import CSS from "./credit-card-form.module.scss";

const INITIAL_VALUES = {
  name: "",
  cardNumber: "",
  cvv2: "",
  expMonth: "",
  expYear: "",
};

const INITIAL_ERRORS = {
  name: "",
  cardNumber: "",
  cvv2: "",
  cardNumberAndCvv2: "",
  expMonth: "",
  expYear: "",
  expMonthAndYear: "",
};

const CreditCardForm = () => {
  const {
    values,
    errors,
    handleInput,
    handleFocus,
    handleBlur,
    isSubmittable,
  } = useForm({
    values: INITIAL_VALUES,
    errors: INITIAL_ERRORS,
    validations: validations,
    formats: formats,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form Submitted!");
    console.log(values);
  };

  return (
    <div className={CSS.creditCardFormFrame}>
      <form className={CSS.creditCardForm}>
        <div className={CSS.title}>Enter Your Credit Card Information</div>
        <div className={CSS.inputsFrame}>
          <CustomInput
            type="text"
            label="Name"
            maxLength="50"
            value={values.name}
            onInput={handleInput("name")}
            onFocus={handleFocus("name")}
            onBlur={handleBlur("name")}
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
                onInput={handleInput("cardNumber")}
                onFocus={handleFocus(["cardNumber", "cardNumberAndCvv2"])}
                onBlur={handleBlur(["cardNumber", "cardNumberAndCvv2"])}
              />
            </div>
            <div className={CSS.cvv2Frame}>
              <CustomInput
                type="text"
                maxLength="4"
                label="CVV2"
                value={values.cvv2}
                onInput={handleInput("cvv2")}
                onFocus={handleFocus(["cvv2", "cardNumberAndCvv2"])}
                onBlur={handleBlur(["cvv2", "cardNumberAndCvv2"])}
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
                label="Exp. Month (MM)"
                value={values.expMonth}
                onInput={handleInput("expMonth")}
                onFocus={handleFocus(["expMonth", "expMonthAndYear"])}
                onBlur={handleBlur(["expMonth", "expMonthAndYear"])}
              />
            </div>
            <div className={CSS.expYearFrame}>
              <CustomInput
                type="text"
                maxLength="4"
                label="Exp. Year (YYYY)"
                value={values.expYear}
                onInput={handleInput("expYear")}
                onFocus={handleFocus(["expYear", "expMonthAndYear"])}
                onBlur={handleBlur(["expYear", "expMonthAndYear"])}
              />
            </div>
          </div>
          <div className={CSS.errorFrame}>
            {errors.expMonth || errors.expYear || errors.expMonthAndYear}
          </div>
        </div>
        <div className={CSS.buttonFrame}>
          <input
            type="submit"
            value="Submit"
            className={`${CSS.button} ${isSubmittable ? "" : CSS.disabled}`}
            onClick={handleSubmit}
            disabled={!isSubmittable}
          />
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;
