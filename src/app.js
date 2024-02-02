import express, { json } from "express";
import colors from "colors";
import config from "./config/index.js";
import authRoutes from "./routes/authRoutes.js";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../client/build")));

//routes
app.use("/api/v1/auth", authRoutes);

//crypto
/*
let key = crypto.randomBytes(64).toString("hex");
console.log(key);
*/

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

export default app;
