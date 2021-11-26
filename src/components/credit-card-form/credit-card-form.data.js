import creditCards from "../../config/creditCards.js";

export const initialValues = {
  name: "",
  cardNumber: "",
  cvv2: "",
  expMonth: "",
  expYear: "",
};

export const validations = {
  name: [
    {
      description: "Name is required.",
      keys: ["name"],
      validator: (name) => {
        if (name.length > 0) return [true];
        else return [false, "Name is required."];
      },
    },
  ],
  cardNumber: [
    {
      description: "Card number is required.",
      keys: ["cardNumber"],
      validator: (cardNumber) => {
        if (cardNumber.length > 0) return [true];
        else return [false, "Card number is required."];
      },
    },
    {
      description: "Card number is valid.",
      keys: ["cardNumber"],
      validator: (cardNumber) => {
        if (
          creditCards.some(({ cardNumberRegex }) =>
            cardNumberRegex.test(cardNumber)
          )
        )
          return [true];
        else return [false, "Invalid credit card number."];
      },
    },
  ],
  cvv2: [
    {
      description: "CVV2 is required.",
      keys: ["cvv2"],
      validator: (cvv2) => {
        if (cvv2.length > 0) return [true];
        else return [false, "CVV2 is required."];
      },
    },
    {
      description: "CVV2 is valid.",
      keys: ["cvv2"],
      validator: (cvv2) => {
        if (creditCards.some(({ cvv2Regex }) => cvv2Regex.test(cvv2)))
          return [true];
        else return [false, "Invalid CVV2."];
      },
    },
  ],
  cardNumberAndCvv2: [
    {
      description: "Validate card and CVV2 combination.",
      keys: ["cardNumber", "cvv2"],
      validator: (cardNumber, cvv2) => {
        for (let { vendor, cardNumberRegex, cvv2Regex } of creditCards) {
          if (cardNumberRegex.test(cardNumber)) {
            if (cvv2Regex.test(cvv2)) return [true];
            else return [false, `Invalid ${vendor} CVV2.`];
          }
        }

        return [false, "Invalid card and CVV2."];
      },
    },
  ],
  expMonth: [
    {
      description: "Expiration month is required.",
      keys: ["expMonth"],
      validator: (expMonth) => {
        if (expMonth.length > 0) return [true];
        else return [false, "Expiration month is required."];
      },
    },
    {
      description: "Expiration month is valid.",
      keys: ["expMonth"],
      validator: (expMonth) => {
        if (/^(0?[1-9]|1[012])$/.test(expMonth)) return [true];
        else return [false, "Expiration month is invalid."];
      },
    },
  ],
  expYear: [
    {
      description: "Expiration year is required.",
      keys: ["expYear"],
      validator: (expYear) => {
        if (expYear.length > 0) return [true];
        else return [false, "Expiration year is required."];
      },
    },
    {
      description: "Expiration year is valid.",
      keys: ["expYear"],
      validator: (expYear) => {
        if (/^20[0-9]{2}$/.test(expYear)) return [true];
        else return [false, "Expiration year is invalid."];
      },
    },
  ],
  expMonthAndYear: [
    {
      description: "Expiration date must be in the future.",
      keys: ["expMonth", "expYear"],
      validator: (expMonth, expYear) => {
        let expDate = new Date(expYear, +expMonth - 1);
        let currentDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth()
        );
        if (expDate < currentDate)
          return [false, "Expiration date must be in the future."];
        else return [true];
      },
    },
  ],
};

export const inputFilters = {
  cardNumber: {
    description: "Only numbers",
    filterer: (value) => filterString(value, /[0-9]{0,16}/),
  },
  cvv2: {
    description: "Only numbers",
    filterer: (value) => filterString(value, /[0-9]{0,16}/),
  },
  expMonth: {
    description: "Only numbers",
    filterer: (value) => filterString(value, /[0-9]{0,2}/),
  },
  expYear: {
    description: "Only numbers",
    filterer: (value) => filterString(value, /[0-9]{0,4}/),
  },
};

export const filterString = (string, regex) =>
  (string.match(regex) || []).join("");
