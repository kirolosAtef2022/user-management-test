const { csvUserSchema } = require("../../service/validation/user.validation");

describe("CSV User Schema Validation", () => {
  test("accepts a valid CSV user", () => {
    const validUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      ip: "192.168.1.1",
      location: "Berlin",
      active: true,
      lastLogin: new Date(),
    };

    const { error } = csvUserSchema.validate(validUser);
    expect(error).toBeUndefined();
  });

  test("rejects invalid email", () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      ip: "192.168.1.1",
      location: "Berlin",
      active: true,
      lastLogin: new Date(),
    };

    const { error } = csvUserSchema.validate(invalidUser);
    expect(error).toBeDefined();
  });

  test("rejects unknown fields", () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      ip: "192.168.1.1",
      location: "Berlin",
      active: true,
      lastLogin: new Date(),
      role: "admin",
    };

    const { error } = csvUserSchema.validate(invalidUser);
    expect(error).toBeDefined();
  });
});
