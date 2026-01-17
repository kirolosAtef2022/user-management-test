const { updateUserSchema } = require("../service/validation/user.validation");

describe("updateUserSchema (PATCH /users/:id)", () => {
  test("accepts a single-field update", () => {
    const payload = {
      firstName: "Jane",
    };

    const { error } = updateUserSchema.validate(payload);

    expect(error).toBeUndefined();
  });

  test("accepts multiple fields update", () => {
    const payload = {
      firstName: "Jane",
      location: "Berlin",
    };

    const { error } = updateUserSchema.validate(payload);

    expect(error).toBeUndefined();
  });

  test("rejects empty update payload", () => {
    const { error } = updateUserSchema.validate({});

    expect(error).toBeDefined();
  });

  test("rejects invalid IP address", () => {
    const payload = {
      ip: "999.999.999.999",
    };

    const { error } = updateUserSchema.validate(payload);

    expect(error).toBeDefined();
  });

  test("rejects unknown fields", () => {
    const payload = {
      role: "admin",
    };

    const { error } = updateUserSchema.validate(payload);

    expect(error).toBeDefined();
  });
});
