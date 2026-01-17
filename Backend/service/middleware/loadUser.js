const User = require("../entity/User");
const AppError = require("../errors/AppError");

const loadUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError({
        message: "User not found",
        statusCode: 404,
        code: "USER_NOT_FOUND",
      })
    );
  }

  req.user = user;
  next();
};

module.exports = loadUser;
