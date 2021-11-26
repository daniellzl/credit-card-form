import creditCards from "../../config/creditCards.js";

const formats = {
  cardNumber: {
    keys: ["cardNumber"],
    formatter: (value) => {
      value = value.replace(/\D/g, "");
      for (let creditCard of creditCards) {
        let { formatter } = creditCard;
        let formattedValue = formatter(value);
        if (formattedValue.length > 0) {
          value = formattedValue;
          break;
        }
      }
      return value;
    },
  },

  cvv2: {
    keys: ["cvv2"],
    formatter: (value) => value.replace(/\D/g, ""),
  },

  expMonth: {
    keys: ["expMonth"],
    formatter: (value) => value.replace(/\D/g, ""),
  },

  expYear: {
    keys: ["expYear"],
    formatter: (value) => value.replace(/\D/g, ""),
  },
};

export default formats;
