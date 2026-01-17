const {
  validateLastLoginBusinessRules,
} = require("../../service/csv/csvBusinessRules");
const AppError = require("../../service/errors/AppError");

describe("CSV Business Rules", () => {
  test("allows past lastLogin date", () => {
    const pastDate = new Date("2024-01-01");
    expect(() => validateLastLoginBusinessRules(pastDate)).not.toThrow();
  });

  test("rejects future lastLogin date", () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60);
    expect(() => validateLastLoginBusinessRules(futureDate)).toThrow(AppError);
  });
});
