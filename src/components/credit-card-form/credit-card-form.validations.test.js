import validations from "./credit-card-form.validations.js";

describe("validations", () => {
  it("contains name, cardNumber, cvv2, cardNumberAndCvv2, expMonth, expYear, expMonthAndYear keys", () => {
    expect(typeof validations.name).toBe("object");
    expect(typeof validations.cardNumber).toBe("object");
    expect(typeof validations.cvv2).toBe("object");
    expect(typeof validations.cardNumberAndCvv2).toBe("object");
    expect(typeof validations.expMonth).toBe("object");
    expect(typeof validations.expYear).toBe("object");
    expect(typeof validations.expMonthAndYear).toBe("object");
  });

  describe("validations.name", () => {
    it("returns error when name is empty", () => {
      expect(validations.name.validator("")[0]).toEqual(false);
    });

    it("returns success when name is not empty", () => {
      expect(validations.name.validator("test")[0]).toEqual(true);
    });
  });

  describe("validations.cardNumber", () => {
    it("returns error when cardNumber is empty", () => {
      expect(validations.cardNumber.validator("")[0]).toEqual(false);
    });

    it("returns error when cardNumber is from unknown vendor", () => {
      expect(validations.cardNumber.validator("12312123123123123")[0]).toEqual(
        false
      );
    });

    it("returns true when cardNumber is from known vendor", () => {
      expect(
        validations.cardNumber.validator("4111 1111 1111 1111")[0]
      ).toEqual(true);
    });
  });

  describe("validations.cvv2", () => {
    it("returns error when cvv2 is empty", () => {
      expect(validations.cvv2.validator("")[0]).toEqual(false);
    });

    it("returns true when cvv2 is from known vendor", () => {
      expect(validations.cvv2.validator("123")[0]).toEqual(true);
    });

    it("returns true when cvv2 is from unknown vendor", () => {
      expect(validations.cvv2.validator("12")[0]).toEqual(false);
    });
  });

  describe("validations.cardNumberAndCvv2", () => {
    it("returns true if cardNumber And Cvv2 match a known vendor", () => {
      expect(
        validations.cardNumberAndCvv2.validator("4111 1111 1111 1111", "123")[0]
      ).toEqual(true);
    });

    it("returns false if cardNumber And Cvv2 doesn't match known vendor", () => {
      expect(
        validations.cardNumberAndCvv2.validator(
          "4111 1111 1111 1111",
          "1231"
        )[0]
      ).toEqual(false);
    });
  });

  describe("validations.expMonth", () => {
    it("returns error when expMonth is empty", () => {
      expect(validations.expMonth.validator("")[0]).toEqual(false);
    });

    it("returns false when expMonth is invalid month", () => {
      expect(validations.expMonth.validator("55")[0]).toEqual(false);
    });

    it("returns true when expMonth is valid month", () => {
      expect(validations.expMonth.validator("12")[0]).toEqual(true);
    });
  });

  describe("validations.expYear", () => {
    it("returns error when expYear is empty", () => {
      expect(validations.expYear.validator("")[0]).toEqual(false);
    });

    it("returns false when expYear is invalid year (not between 2000 and 2099)", () => {
      expect(validations.expYear.validator("2100")[0]).toEqual(false);
    });

    it("returns true when expYear is valid year (between 2000 and 2099)", () => {
      expect(validations.expYear.validator("2000")[0]).toEqual(true);
    });
  });

  describe("validations.expMonthAndYear", () => {
    it("returns error when expMonth and year are in the past", () => {
      expect(validations.expYear.validator("01", "2021")[0]).toEqual(false);
    });
    it("returns true when expMonth and year are in the future", () => {
      expect(validations.expYear.validator("01", "2099")[0]).toEqual(false);
    });
  });
});
