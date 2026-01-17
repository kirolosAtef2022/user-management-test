const Joi = require("joi");
const allowedLocations = require("../csv/csvLocations");

const NAME_PART_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

/* ============================================================
 * BASE FIELDS (shared)
 * ============================================================ */
const baseUserFields = {
  firstName: Joi.string().pattern(NAME_PART_REGEX),
  lastName: Joi.string().pattern(NAME_PART_REGEX),
  email: Joi.string().email({ tlds: { allow: false } }),
  ip: Joi.string().ip({ version: ["ipv4"] }),
  location: Joi.string().valid(...allowedLocations),
  active: Joi.boolean(),
};

/* ============================================================
 * CREATE USER DTO (POST /users)
 * ============================================================ */
const createUserSchema = Joi.object({
  ...baseUserFields,

  firstName: baseUserFields.firstName.required(),
  lastName: baseUserFields.lastName.required(),
  email: baseUserFields.email.required(),
  ip: baseUserFields.ip.required(),
  location: baseUserFields.location.required(),

  active: Joi.boolean().optional(),
}).options({
  abortEarly: false,
  allowUnknown: false,
});

/* ============================================================
 * UPDATE USER DTO (PATCH /users/:id)
 * ============================================================ */
const updateUserSchema = Joi.object({
  ...baseUserFields,
})
  .min(1)
  .options({
    abortEarly: false,
    allowUnknown: false,
  });

/* ============================================================
 * CSV IMPORT DTO
 * ============================================================ */
const csvUserSchema = Joi.object({
  ...baseUserFields,

  firstName: baseUserFields.firstName.required(),
  lastName: baseUserFields.lastName.required(),
  email: baseUserFields.email.required(),
  ip: baseUserFields.ip.required(),
  location: baseUserFields.location.required(),

  active: Joi.boolean().required(),
  lastLogin: Joi.date().required(),
}).options({
  abortEarly: false,
  allowUnknown: false,
});

/* ============================================================
 * EXPORT HELPERS
 * ============================================================ */
module.exports = {
  createUserSchema,
  updateUserSchema,
  csvUserSchema,
};
