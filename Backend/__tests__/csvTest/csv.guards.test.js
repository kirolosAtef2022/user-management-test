const { checkRequiredFields } = require("../../service/csv/csvGuards");
const AppError = require("../../service/errors/AppError");

describe("CSV Required Fields Guard", () => {
  test("passes when all required fields exist", () => {
    const row = {
      Name: "John Doe",
      Email: "john@example.com",
      IPAddress: "192.168.1.1",
      Location: "Berlin",
      Active: "true",
      LastLogin: "2026-01-01 10:00:00",
    };

    expect(() => checkRequiredFields(row)).not.toThrow();
  });

  test("throws error when a required field is missing", () => {
    const row = {
      Name: "John Doe",
      Email: "john@example.com",
      IPAddress: "192.168.1.1",
      Location: "Berlin",
      Active: "true",
      // LastLogin missing
    };

    expect(() => checkRequiredFields(row)).toThrow(AppError);
  });
});
