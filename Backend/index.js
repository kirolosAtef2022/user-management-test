// index.js
const app = require("./service/app");
const connectToMongoDB = require("./service/config/connectToMongoDB");
const { importUsers } = require("./service/csv/importUsersToDB");

(async () => {
  try {
    await connectToMongoDB();

    // OK for the test — I will explain the tradeoff in interview
    await importUsers();
    app.listen(3000, () => {
      console.log("🚀 Backend running on port 3000");
    });
  } catch (error) {
    console.error("❌ Startup error:", error.message);
    process.exit(1);
  }
})();
