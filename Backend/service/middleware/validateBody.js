const AppError = require("../errors/AppError");

const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    stripUnknown: true,
  });

  if (error) {
    return next(
      new AppError({
        message: "Validation failed",
        statusCode: 400,
        code: "VALIDATION_ERROR",
      })
    );
  }

  req.body = value; // clean data
  next();
};

module.exports = validateBody;
