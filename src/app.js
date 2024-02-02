import express, { json } from "express";
import colors from "colors";
import authRoutes from "./routes/authRoutes.js";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
