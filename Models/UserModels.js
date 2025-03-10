import mongoose from "mongoose";
import { UserStatus } from "../utils/constants.js";
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.JOD,
    },
    avatar: String,
    avatarPublicId: String,
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    totalBookings: {
      type: Number,
      default: 0,
    },
    gamesWin: {
      type: Number,
      default: 0,
    },
    registeredGames: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Games",
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", User);
