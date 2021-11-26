const creditCards = [
  {
    vendor: "Visa",
    cardNumberRegex: /^4[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}$/,
    cvv2Regex: /^[0-9]{3}$/,
  },
  {
    vendor: "American Express",
    cardNumberRegex: /^3[47][0-9]{2} [0-9]{6} [0-9]{5}$/,
    cvv2Regex: /^[0-9]{4}$/,
  },
];

export default creditCards;
