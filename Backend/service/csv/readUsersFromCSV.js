const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const { csvUserSchema } = require("../validation/user.validation");
const { checkRequiredFields } = require("./csvGuards");
const {
  normalizeString,
  parseBoolean,
  parseDateTime,
  splitFullName,
  parseLocation,
} = require("../utils/dataParsers");
const { validateLastLoginBusinessRules } = require("./csvBusinessRules");

const readUsersFromCSV = () => {
  return new Promise((resolve, reject) => {
    const users = [];
    const failed = [];

    const csvPath = path.resolve("/app/data/user.csv");
    let rowNumber = 0;
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        rowNumber += 1;
        try {
          // 1️⃣ Required fields
          checkRequiredFields(row);

          // 2️⃣ Normalize
          const fullName = normalizeString(row.Name);
          const email = normalizeString(row.Email).toLowerCase();
          const ip = normalizeString(row.IPAddress);

          // 3️⃣ Parse & transform
          const { firstName, lastName } = splitFullName(fullName);
          const location = parseLocation(row.Location);
          const active = parseBoolean(row.Active);
          const lastLogin = parseDateTime(row.LastLogin);

          // 4️⃣ Business rules
          validateLastLoginBusinessRules(lastLogin);

          // 5️⃣ Final domain object
          const user = {
            firstName,
            lastName,
            email,
            ip,
            location,
            active,
            lastLogin,
          };

          // 6️⃣ Joi validation (FINAL GATE)
          const { error, value } = csvUserSchema.validate(user, {
            abortEarly: false,
            stripUnknown: true,
          });

          if (error) {
            failed.push({
              rowNumber,
              row,
              errors: error.details.map((d) => d.message),
            });
            return;
          }

          users.push(value);
        } catch (err) {
          failed.push({ rowNumber, row, error: err.message });
        }
      })
      .on("end", () => resolve({ users, failed }))
      .on("error", reject);
  });
};

module.exports = { readUsersFromCSV };
