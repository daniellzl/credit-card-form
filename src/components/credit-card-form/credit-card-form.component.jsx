import { initialValues, validations } from "./credit-card-form.data.js";
import useForm from "../../hooks/useForm.js";

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
    <form>
      <div>
        <input
          id="name"
          type="text"
          value={values.name}
          onInput={handleInput("name")}
          onBlur={handleBlur("name")}
        />
        <label htmlFor="name">Name</label>
        {errors.name}
      </div>
      <div>
        <input
          id="card-number"
          type="text"
          value={values.cardNumber}
          onInput={handleInput("cardNumber")}
          onBlur={handleBlur(["cardNumber", "cardNumberAndCvv2"])}
        />
        <label htmlFor="card-number">Card Number</label>
        {errors.cardNumber}
      </div>
      <div>
        <input
          id="cvv2"
          type="text"
          value={values.cvv2}
          onInput={handleInput("cvv2")}
          onBlur={handleBlur(["cvv2", "cardNumberAndCvv2"])}
        />
        <label htmlFor="cvv2">CVV2</label>
        {errors.cvv2}
      </div>
      <div>
        <input
          id="exp-month"
          type="text"
          value={values.expMonth}
          onInput={handleInput("expMonth")}
          onBlur={handleBlur(["expMonth", "expMonthAndYear"])}
          maxLength="2"
        />
        <label htmlFor="exp-month">Exp. Month</label>
        {errors.expMonth}
      </div>
      <div>
        <input
          id="exp-year"
          type="text"
          value={values.expYear}
          onInput={handleInput("expYear")}
          onBlur={handleBlur(["expYear", "expMonthAndYear"])}
          maxLength="4"
        />
        <label htmlFor="exp-year">Exp. Year</label>
        {errors.expYear}
      </div>
      <div>
        <input
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          disabled={!isValid()}
        />
      </div>
      {errors.cardNumberAndCvv2}
      {errors.expMonthAndYear}
    </form>
  );
};

export default CreditCardForm;
