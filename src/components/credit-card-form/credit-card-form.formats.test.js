import formats from "./credit-card-form.formats.js";

describe("formats", () => {
  it("cardNumber, cvv2, expMonth, expYear keys exist", () => {
    expect(typeof formats.cardNumber).toBe("object");
    expect(typeof formats.cvv2).toBe("object");
    expect(typeof formats.expMonth).toBe("object");
    expect(typeof formats.expYear).toBe("object");
  });
});

describe("format.cardNumber", () => {
  it("removes non digits", () => {
    expect(formats.cardNumber.formatter("1234asdf")).toEqual("1234");
  });

  it("returns same card number for unknown card vendor", () => {
    expect(formats.cardNumber.formatter("12345")).toEqual("12345");
  });

  it("formats visa card number", () => {
    expect(formats.cardNumber.formatter("4234123412341234")).toEqual(
      "4234 1234 1234 1234"
    );
    expect(formats.cardNumber.formatter("42341234123412341234")).toEqual(
      "4234 1234 1234 1234"
    );
    expect(formats.cardNumber.formatter("4234123asdf   4123412341234")).toEqual(
      "4234 1234 1234 1234"
    );
  });

  it("formats amex card number", () => {
    expect(formats.cardNumber.formatter("343412341234123")).toEqual(
      "3434 123412 34123"
    );
    expect(formats.cardNumber.formatter("37341234123412312312312312")).toEqual(
      "3734 123412 34123"
    );
    expect(
      formats.cardNumber.formatter(
        "37341asdfa awef    23412341231231  asdfa2312312"
      )
    ).toEqual("3734 123412 34123");
  });
});

describe("format.cvv2", () => {
  it("removes non digits", () => {
    expect(formats.cvv2.formatter("1234asdf")).toEqual("1234");
  });
});

describe("format.expMonth", () => {
  it("removes non digits", () => {
    expect(formats.expMonth.formatter("1234asdf")).toEqual("1234");
  });
});

describe("format.expYear", () => {
  it("removes non digits", () => {
    expect(formats.expMonth.formatter("1234asdf")).toEqual("1234");
  });
});
