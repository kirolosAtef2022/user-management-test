const { createUserSchema } = require("../service/validation/user.validation");

describe("createUserSchema (POST /users)", () => {
  test("accepts a valid create user payload", () => {
    const validUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      ip: "192.168.1.1",
      location: "Berlin",
      active: true,
    };

    const { error } = createUserSchema.validate(validUser);

    expect(error).toBeUndefined();
  });

  test("rejects missing required fields", () => {
    const invalidUser = {
      email: "john@example.com",
    };

    const { error } = createUserSchema.validate(invalidUser);

    expect(error).toBeDefined();
  });

  test("rejects invalid email format", () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "not-an-email",
      ip: "192.168.1.1",
      location: "Berlin",
    };

    const { error } = createUserSchema.validate(invalidUser);

    expect(error).toBeDefined();
  });

  test("rejects invalid IPv4 address", () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      ip: "999.999.999.999",
      location: "Berlin",
    };

    const { error } = createUserSchema.validate(invalidUser);

    expect(error).toBeDefined();
  });

  test("rejects unknown fields", () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      ip: "192.168.1.1",
      location: "Berlin",
      role: "admin", // ❌ not allowed
    };

    const { error } = createUserSchema.validate(invalidUser);

    expect(error).toBeDefined();
  });
});
