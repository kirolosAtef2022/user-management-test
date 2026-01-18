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
  } catch (error) {
    next(error);
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
    req.user.active = false;
    await req.user.save();

    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

const toggleUserUnblock = async (req, res, next) => {
  try {
    req.user.active = true;
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
  toggleUserUnblock,
};
