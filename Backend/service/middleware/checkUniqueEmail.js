const User = require("../entity/User");
const AppError = require("../errors/AppError");

const checkUniqueEmail = async (req, res, next) => {
  if (!req.body.email) return next();

  const existingUser = await User.findOne({
    email: req.body.email,
    _id: { $ne: req.params.id },
  });

  if (existingUser) {
    return next(
      new AppError({
        message: "Email already exists",
        statusCode: 409,
        code: "EMAIL_ALREADY_EXISTS",
      })
    );
  }

  next();
};

module.exports = checkUniqueEmail;
