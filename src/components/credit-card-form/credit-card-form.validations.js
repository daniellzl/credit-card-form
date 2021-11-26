import creditCards from "../../config/creditCards.js";

const validations = {
  name: {
    description: "Name is required.",
    keys: ["name"],
    validator: (name) => {
      // check if present
      if (name.length > 0) return [true];
      else return [false, "Name is required."];
    },
  },

  cardNumber: {
    keys: ["cardNumber"],
    validator: (cardNumber) => {
      // check if present
      if (cardNumber.length === 0) return [false, "Card number is required."];
      // check if card number is valid
      if (
        !creditCards.some(({ cardNumberRegex }) =>
          cardNumberRegex.test(cardNumber)
        )
      )
        return [false, "Invalid credit card number."];
      return [true];
    },
  },

  cvv2: {
    keys: ["cvv2"],
    validator: (cvv2) => {
      // check if present
      if (cvv2.length === 0) return [false, "CVV2 is required."];
      // check if cvv2 is valid
      if (!creditCards.some(({ cvv2Regex }) => cvv2Regex.test(cvv2)))
        return [false, "Invalid CVV2."];
      return [true];
    },
  },

  cardNumberAndCvv2: {
    keys: ["cardNumber", "cvv2"],
    validator: (cardNumber, cvv2) => {
      // check if card number and cvv2 are from a known card vendor
      for (let { vendor, cardNumberRegex, cvv2Regex } of creditCards) {
        if (cardNumberRegex.test(cardNumber)) {
          if (cvv2Regex.test(cvv2)) return [true];
          else return [false, `Invalid ${vendor} CVV2.`];
        }
      }
      return [false, "Invalid card and CVV2."];
    },
  },

  expMonth: {
    keys: ["expMonth"],
    validator: (expMonth) => {
      // check existence
      if (expMonth.length === 0)
        return [false, "Expiration month is required."];
      // check if valid month
      if (!/^(0?[1-9]|1[012])$/.test(expMonth))
        return [false, "Expiration month is invalid."];
      return [true];
    },
  },

  expYear: {
    keys: ["expYear"],
    validator: (expYear) => {
      // check existence
      if (expYear.length === 0) return [false, "Expiration year is required."];
      // check if valid year
      if (!/^20[0-9]{2}$/.test(expYear))
        return [false, "Expiration year is invalid."];
      return [true];
    },
  },

  expMonthAndYear: {
    keys: ["expMonth", "expYear"],
    validator: (expMonth, expYear) => {
      // check if expiration date is in future
      let expDate = new Date(expYear, +expMonth - 1);
      let currentDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth()
      );
      if (expDate < currentDate)
        return [false, "Expiration date must be in the future."];
      return [true];
    },
  },
};

export default validations;
