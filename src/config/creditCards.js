const creditCards = [
  {
    vendor: "Visa",
    cardNumberRegex: /^4[0-9]{15}$/,
    cvv2Regex: /^[0-9]{3}$/,
  },
  {
    vendor: "American Express",
    cardNumberRegex: /^3[47][0-9]{13}$/,
    cvv2Regex: /^[0-9]{4}$/,
  },
];

export default creditCards;
