const AppError = require("../errors/AppError");
const allowedLocations = require("../constants/csvLocations");

//normalize string by trimming whitespace
const normalizeString = (value) => value.trim();

//parse boolean from string
const parseBoolean = (value) => {
  if (value === true || value.toLowerCase() === "true") return true;
  if (value === false || value.toLowerCase() === "false") return false;
  throw new AppError({
    message: "Invalid active value (must be true or false)",
    statusCode: 400,
    code: "VERIFICATIO_ERROR",
  });
};

//parse location and validate against allowed locations
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

//parse date time from string
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

//split full name into first and last name
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

//capitalize the first letter of a string
function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Detect duplicate emails within the CSV data
function detectDuplicateEmails(users) {
  const seen = new Set();
  const valid = [];
  const duplicates = [];

  users.forEach((user, index) => {
    if (seen.has(user.email)) {
      duplicates.push({
        rowNumber: index + 1,
        error: "Duplicate email in CSV file",
      });
    } else {
      seen.add(user.email);
      valid.push(user);
    }
  });

  return { valid, duplicates };
}

module.exports = {
  normalizeString,
  parseBoolean,
  parseLocation,
  parseDateTime,
  splitFullName,
  capitalizeFirstLetter,
  detectDuplicateEmails,
};
