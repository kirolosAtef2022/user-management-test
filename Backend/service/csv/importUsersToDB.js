const User = require("../entity/User");
const { readUsersFromCSV } = require("../csv/readUsersFromCSV");
const AppError = require("../errors/AppError");

async function importUsers() {
  console.log("Importing users from CSV...");

  const { users, failed } = await readUsersFromCSV();

  if (!users.length) {
    console.log("No valid users to import");
    return;
  }

  try {
    await User.insertMany(users, { ordered: false });

    console.log(`Imported ${users.length} users into MongoDB`);

    if (failed.length > 0) {
      console.log(`${failed.length} rows failed validation:`);

      failed.forEach((f) => {
        console.log(
          `  - Row ${f.rowNumber}: ${f.error || f.errors.join(", ")}`
        );
      });
    }
  } catch (err) {
    // Duplicate email(s)
    if (err.code === 11000) {
      throw new AppError({
        message: "Duplicate email found during CSV import",
        code: "CSV_DUPLICATE_EMAIL",
        statusCode: 409,
      });
    }

    // Anything else is a real system failure
    throw new AppError({
      message: "Failed to import users from CSV",
      code: "CSV_IMPORT_FAILED",
      statusCode: 500,
    });
  }
}

module.exports = { importUsers };
