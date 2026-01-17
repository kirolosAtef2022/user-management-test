const AppError = require("../errors/AppError");
const allowedLocations = require("./csvLocations");

const normalizeString = (value) => value.trim();
const parseBoolean = (value) => {
  if (value === true || value.toLowerCase() === "true") return true;
  if (value === false || value.toLowerCase() === "false") return false;
  throw new AppError({
    message: "Invalid active value (must be true or false)",
    statusCode: 400,
    code: "VERIFICATIO_ERROR",
  });
};

const parseLocation = (value) => {
  const normalizedLocation = normalizeString(value);
  const parsedLocation = capitalizeFirstLetter(normalizedLocation);
  if (!allowedLocations.includes(parsedLocation)) {
    throw new AppError({
      message: `Invalid location: ${value}`,
      statusCode: 400,
      code: "VERIFICATION_ERROR",
    });
  }

  return parsedLocation;
};

const parseDateTime = (value) => {
  const date = new Date(normalizeString(value).replace(" ", "T"));
  if (isNaN(date.getTime())) {
    throw new AppError({
      message: "Invalid lastLogin format",
      statusCode: 400,
      code: "VERIFICATIO_ERROR",
    });
  }
  return date;
};

const splitFullName = (fullName) => {
  const parts = fullName.split(" ").filter(Boolean);

  if (parts.length < 2) {
    throw new AppError({
      message: "Name must contain first and last name",
      statusCode: 400,
      code: "VERIFICATIO_ERROR",
    });
  }

  return {
    firstName: capitalizeFirstLetter(parts[0]),
    lastName: capitalizeFirstLetter(parts.slice(1).join(" ")),
  };
};

function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

module.exports = {
  normalizeString,
  parseBoolean,
  parseLocation,
  parseDateTime,
  splitFullName,
  capitalizeFirstLetter,
};
