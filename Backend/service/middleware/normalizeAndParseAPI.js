const {
  normalizeString,
  parseBoolean,
  capitalizeFirstLetter,
  parseLocation,
} = require("../utils/dataParsers");

module.exports = (req, res, next) => {
  if (req.body.firstName) {
    req.body.firstName = capitalizeFirstLetter(
      normalizeString(req.body.firstName)
    );
  }
  if (req.body.lastName) {
    req.body.lastName = capitalizeFirstLetter(
      normalizeString(req.body.lastName)
    );
  }

  if (req.body.email) {
    req.body.email = normalizeString(req.body.email).toLowerCase();
  }

  if (req.body.ip) {
    req.body.ip = normalizeString(req.body.ip);
  }
  if (req.body.location) {
    req.body.location = parseLocation(req.body.location);
  }
  if (req.body.active !== undefined) {
    req.body.active = parseBoolean(normalizeString(String(req.body.active)));
  }

  next();
};
