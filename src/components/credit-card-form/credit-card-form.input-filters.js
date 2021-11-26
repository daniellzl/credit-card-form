const filterString = (string, regex) => (string.match(regex) || []).join("");

const inputFilters = {
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

export default inputFilters;
