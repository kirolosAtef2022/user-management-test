// Backend/scripts/importUsers.js
const connectToMongoDB = require("../service/config/connectToMongoDB");
const { importUsers } = require("../service/csv/importUsersToDB");

(async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectToMongoDB();

    console.log("📥 Importing users from CSV...");
    await importUsers();

    console.log("✅ CSV import completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ CSV import failed:", err.message);
    process.exit(1);
  }
})();
