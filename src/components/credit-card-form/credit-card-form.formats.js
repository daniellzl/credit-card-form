const filterString = (string, regex) => (string.match(regex) || []).join("");

const formats = {
  cardNumber: {
    keys: ["cardNumber"],
    formatter: (value) => {
      // numbers only
      value = filterString(value, /[0-9]{0,16}/);
      // add spaces between every 4th digit
      let newValue = [];
      for (let begin = 0, end = 4; begin < value.length; begin += 4, end += 4)
        newValue.push(value.slice(begin, end));
      return newValue.join(" ");
    },
  },

  cvv2: {
    keys: ["cvv2"],
    formatter: (value) => filterString(value, /[0-9]{0,16}/),
  },

  expMonth: {
    keys: ["expMonth"],
    formatter: (value) => filterString(value, /[0-9]{0,2}/),
  },

  expYear: {
    keys: ["expYear"],
    formatter: (value) => filterString(value, /[0-9]{0,4}/),
  },
};

export default formats;
