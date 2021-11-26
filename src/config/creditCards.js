const filterString = (string, regex) => (string.match(regex) || []).join("");

const creditCards = [
  {
    vendor: "Visa",
    cardNumberRegex: /^4[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}$/,
    cvv2Regex: /^[0-9]{3}$/,
    formatter: (cardNumber) => {
      cardNumber = filterString(cardNumber, /^4[0-9]{0,15}/);
      if (cardNumber.length === 0) return "";

      let sliceIndexes = [
        [0, 4],
        [4, 8],
        [8, 12],
        [12, 16],
      ];
      let newCardNumber = [];

      for (let sliceIndex of sliceIndexes) {
        let slicedValue = cardNumber.slice(sliceIndex[0], sliceIndex[1]);
        if (slicedValue.length > 0) newCardNumber.push(slicedValue);
        else break;
      }

      return newCardNumber.join(" ");
    },
  },

  {
    vendor: "American Express",
    cardNumberRegex: /^3[47][0-9]{2} [0-9]{6} [0-9]{5}$/,
    cvv2Regex: /^[0-9]{4}$/,
    formatter: (cardNumber) => {
      cardNumber = filterString(cardNumber, /^3[47][0-9]{0,13}/);
      if (cardNumber.length === 0) return "";

      let sliceIndexes = [
        [0, 4],
        [4, 10],
        [10, 15],
      ];
      let newCardNumber = [];

      for (let sliceIndex of sliceIndexes) {
        let slicedValue = cardNumber.slice(sliceIndex[0], sliceIndex[1]);
        if (slicedValue.length > 0) newCardNumber.push(slicedValue);
        else break;
      }

      return newCardNumber.join(" ");
    },
  },
];

export default creditCards;
