const AppError = require("../errors/AppError");
const validateLastLoginBusinessRules = (lastLogin) => {
  if (lastLogin > new Date()) {
    throw new AppError({
      message: "lastLogin is in the future",
      statusCode: 400,
      code: "VERIFICATIO_ERROR",
    });
  }
};

module.exports = { validateLastLoginBusinessRules };
