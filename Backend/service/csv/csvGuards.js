const AppError = require("../errors/AppError");
const REQUIRED_FIELDS = [
  "Name",
  "Email",
  "IPAddress",
  "Location",
  "Active",
  "LastLogin",
];

const checkRequiredFields = (row) => {
  for (const field of REQUIRED_FIELDS) {
    if (row[field] === undefined || row[field] === null || row[field] === "") {
      throw new AppError({
        message: `Missing required field: ${field}`,
        statusCode: 400,
        code: "VERIFICATIO_ERROR",
      });
    }
  }
};

module.exports = { checkRequiredFields };
