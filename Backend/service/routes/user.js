const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUserBlock,
  toggleUserUnblock,
} = require("../controller/userController");

// middlewares
const loadUser = require("../middleware/loadUser");
const validateBody = require("../middleware/validateBody");
const checkUniqueEmail = require("../middleware/checkUniqueEmail");
const normalizeAndParseAPI = require("../middleware/normalizeAndParseAPI");

// validation schemas
const {
  createUserSchema,
  updateUserSchema,
} = require("../validation/user.validation");

/**
 * GET all users
 */
router.get("/", getAllUsers);

/**
 * GET user by id
 */
router.get("/:id", loadUser, getUserById);

/**
 * CREATE user
 */
router.post(
  "/",
  normalizeAndParseAPI,
  validateBody(createUserSchema),
  checkUniqueEmail,
  createUser
);

/**
 * UPDATE user
 */
router.patch(
  "/:id",
  loadUser,
  normalizeAndParseAPI,
  validateBody(updateUserSchema),
  checkUniqueEmail,
  updateUser
);

/**
 * BLOCK / UNBLOCK user
 */
router.patch("/:id/block", loadUser, toggleUserBlock);
router.patch("/:id/unblock", loadUser, toggleUserUnblock);

module.exports = router;
