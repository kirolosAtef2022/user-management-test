const User = require("../entity/User");
const AppError = require("../errors/AppError");

/**
 * GET all users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * GET user by ID
 * loadUser middleware already ran
 */
const getUserById = async (req, res) => {
  res.json(req.user);
};

/**
 * CREATE user
 * validateBody middleware already ran
 */
const createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      ...req.body,
      active: req.body.active ?? true,
      lastLogin: new Date(),
    });

    res.status(201).json(user);
  } catch (err) {
    // Mongo duplicate email safety net
    if (err.code === 11000 && err.keyPattern?.email) {
      return next(
        new AppError({
          message: "Email is already registered",
          statusCode: 409,
          code: "EMAIL_ALREADY_EXISTS",
        })
      );
    }

    next(err);
  }
};

/**
 * UPDATE user
 * loadUser + validateBody + checkUniqueEmail already ran
 */
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * BLOCK / UNBLOCK user
 * loadUser already ran
 */
const toggleUserBlock = async (req, res, next) => {
  try {
    req.user.active = !req.user.active;
    await req.user.save();

    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUserBlock,
};
// const User = require("../entity/User");
// const {
//   createUserSchema,
//   updateUserSchema,
// } = require("../validation/user.validation");
// const AppError = require("../errors/AppError");
// /**
//  * GET all users
//  */
// const getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find().lean();
//     res.json(users);
//   } catch (error) {
//     return next(
//       new AppError({
//         message: "internal server error",
//         statusCode: 500,
//         code: "SERVER_ERROR",
//       })
//     );
//   }
// };

// /**
//  * GET user by ID
//  */
// const getUserById = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return next(
//         new AppError({
//           message: "User not found",
//           statusCode: 404,
//           code: "USER_NOT_FOUND",
//         })
//       );
//     }
//     res.json(user);
//   } catch (error) {
//     return next(
//       new AppError({
//         message: "internal server error",
//         statusCode: 500,
//         code: "SERVER_ERROR",
//       })
//     );
//   }
// };

// /**
//  * CREATE user
//  */
// const createUser = async (req, res, next) => {
//   try {
//     // 1️⃣ Validate request body
//     const { error, value } = createUserSchema.validate(req.body, {
//       stripUnknown: true,
//     });

//     if (error) {
//       return next(
//         new AppError({
//           message: "Validation failed",
//           statusCode: 400,
//           code: "VALIDATION_ERROR",
//         })
//       );
//     }

//     // 2️⃣ Create user
//     const user = await User.create({
//       ...value,
//       active: value.active ?? true,
//       lastLogin: new Date(),
//     });

//     // 3️⃣ Success response
//     res.status(201).json(user);
//   } catch (err) {
//     // 4️⃣ Handle duplicate email (MongoDB)
//     if (err.code === 11000 && err.keyPattern?.email) {
//       return next(
//         new AppError({
//           message: "Email is already registered",
//           statusCode: 409,
//           code: "EMAIL_ALREADY_EXISTS",
//         })
//       );
//     }

//     // 5️⃣ Pass all other errors to central handler
//     next(err);
//   }
// };

// /**
//  * UPDATE user
//  */
// const updateUser = async (req, res, next) => {
//   try {
//     const { error, value } = updateUserSchema.validate(req.body, {
//       stripUnknown: true,
//     });

//     if (error) {
//       return next(
//         new AppError({
//           message: "Validation failed",
//           statusCode: 400,
//           code: "VALIDATION_ERROR",
//         })
//       );
//     }

//     // Email uniqueness (only if email is present)
//     if (value.email) {
//       const existingUser = await User.findOne({
//         email: value.email,
//         _id: { $ne: req.params.id },
//       });

//       if (existingUser) {
//         return next(
//           new AppError({
//             message: "Email already exists",
//             statusCode: 409,
//             code: "EMAIL_ALREADY_EXISTS",
//           })
//         );
//       }
//     }

//     const user = await User.findByIdAndUpdate(req.params.id, value, {
//       new: true,
//     });

//     if (!user) {
//       return next(
//         new AppError({
//           message: "User not found",
//           statusCode: 404,
//           code: "USER_NOT_FOUND",
//         })
//       );
//     }

//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };
// /**
//  * BLOCK / UNBLOCK user
//  */
// const toggleUserBlock = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return next(
//         new AppError({
//           message: "User not found",
//           statusCode: 404,
//           code: "USER_NOT_FOUND",
//         })
//       );
//     }

//     user.active = !user.active;
//     await user.save();

//     res.json(user);
//   } catch (error) {
//     return next(
//       new AppError({
//         message: "internal server error",
//         statusCode: 500,
//         code: "SERVER_ERROR",
//       })
//     );
//   }
// };

// module.exports = {
//   getAllUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   toggleUserBlock,
// };
