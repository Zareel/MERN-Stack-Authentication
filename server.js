import mongoose from "mongoose";
import app from "./app.js";
import config from "./src/config/index.js";
import colors from "colors";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("DB Connected");

    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
    const PORT = config.PORT;
    app.listen(PORT, () => {
      console.log(`App is listening at PORT: ${PORT}`);
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
