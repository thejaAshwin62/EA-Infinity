import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRouter from "./Routers/authRouter.js";
import errorHandlerMiddleware from "./Middleware/errorHandlerMiddleware.js";
import { StatusCodes } from "http-status-codes";
import gameRouter from "./Routers/gameRouter.js";
// import { authenticateUser } from "./middleware/authMiddleware.js";
import userRouter from "./Routers/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { verifyJWT } from "./utils/tokenUtils.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const authenticateUser = (req, res, next) => {
  if (req.path === "/") {
    return next();
  }

  const token = req.cookies?.token;

  if (!token) {
    return next();
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    return next();
  }
};

// Define __dirname first
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(cookieParser());
// Routes
app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received", data: req.body });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/games", authenticateUser, gameRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

// Static files
app.use(express.static(path.resolve(__dirname, "./Public")));

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./Public", "index.html"));
});

// Post route for data

// 404 Not found
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found" });
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// General error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong" });
});

// PORT and MONGODB connection
const port = process.env.PORT || 5100;

const startServer = async () => {
  try {
    const mongoURI = process.env.MONGO_URL;

    if (!mongoURI) {
      throw new Error("MONGO_URL environment variable is not set");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(`Server running on PORT ${port}....`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
