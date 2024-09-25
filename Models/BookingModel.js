import mongoose from "mongoose";
import User from'../Models/UserModels.js'
import Game from'../Models/GamesModel.js'

const Booking = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Games",
      required: true,
    },
    registerAt: {
      type: Date,
      default: Date.now,
    },
    registerDate: {
      type: Date,
    },
    isApproved: {
      type: String,
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", Booking);
