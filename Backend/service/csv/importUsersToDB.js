const User = require("../entity/User");
const { readUsersFromCSV } = require("../csv/readUsersFromCSV");
const { detectDuplicateEmails } = require("../utils/dataParsers");

const AppError = require("../errors/AppError");

async function importUsers() {
  console.log("Importing users from CSV...");

  const { users, failed } = await readUsersFromCSV();

  //check & detect Dublicate Emails with Detailed Error
  const { valid, duplicates } = detectDuplicateEmails(users);

  //combine all failed rows form validation & Email uniqueness
  const allFailed = [...failed, ...duplicates];

  if (!valid.length) {
    console.log("No valid users to import");
    if (allFailed.length > 0) {
      console.log(`${allFailed.length} rows failed validation:`);

      allFailed.forEach((f) => {
        console.log(
          `  - Row ${f.rowNumber}: ${f.error || f.errors.join(", ")}`
        );
      });
    }
    return;
  }

  if (allFailed.length > 0) {
    console.log(`${allFailed.length} rows failed validation:`);

    allFailed.forEach((f) => {
      console.log(`  - Row ${f.rowNumber}: ${f.error || f.errors.join(", ")}`);
    });
  }

  try {
    //Insert to Database
    await User.insertMany(valid, { ordered: false });
    console.log(`Imported ${valid.length} users into MongoDB`);
  } catch (error) {
    throw new AppError({
      message: "Failed to import users to MongoDB",
      code: "CSV_IMPORT_ERROR",
      statusCode: 500,
    });
  }
}

//      console.log("User import completed.");
module.exports = { importUsers };
