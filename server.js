import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRouter from "./Routers/authRouter.js";
import errorHandlerMiddleware from "./Middleware/errorHandlerMiddleware.js";
import { StatusCodes } from "http-status-codes";
import gameRouter from "./Routers/gameRouter.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import userRouter from "./Routers/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Define __dirname first
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Update this for production
    credentials: true,
  })
);

// Routes
app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received", data: req.body });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/games", authenticateUser, gameRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

// Static files
app.use(express.static(path.resolve(__dirname, "./public")));

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
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
