import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";
import colors from "colors";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);

    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
  } catch (error) {
    console.log(`Error in connecting with Database ${error}`.bgRed.white);
    res.status(500).json({
      success: false,
      message: "Error in DB Connection",
      error,
    });
  }
})();
