const {
  normalizeString,
  parseBoolean,
  parseDateTime,
  splitFullName,
} = require("../../service/utils/dataParsers");
const AppError = require("../../service/errors/AppError");

describe("CSV Parsers", () => {
  test("normalizeString trims whitespace", () => {
    expect(normalizeString("  Berlin  ")).toBe("Berlin");
  });

  test("parseBoolean parses valid values", () => {
    expect(parseBoolean("true")).toBe(true);
    expect(parseBoolean("false")).toBe(false);
  });

  test("parseBoolean throws on invalid value", () => {
    expect(() => parseBoolean("yes")).toThrow(AppError);
  });

  test("parseDateTime parses valid datetime", () => {
    const date = parseDateTime("2026-01-01 12:00:00");
    expect(date).toBeInstanceOf(Date);
  });

  test("parseDateTime throws on invalid format", () => {
    expect(() => parseDateTime("invalid-date")).toThrow(AppError);
  });

  test("splitFullName splits first and last name", () => {
    const result = splitFullName("John Doe");
    expect(result).toEqual({ firstName: "John", lastName: "Doe" });
  });

  test("splitFullName throws if only one name provided", () => {
    expect(() => splitFullName("John")).toThrow(AppError);
  });
});
