import mongoose from "mongoose";
import { GameModes, GameNames } from "../utils/constants.js";

const GamesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: Object.values(GameNames), // Ensure the game name comes from the defined constants
      default: GameNames.FORTNITE, // Default to Fortnite
      required: true,
    },
    slots: {
      type: Number,
      required: true,
    },
    joinPrice: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      enum: Object.values(GameModes), // Ensure the mode comes from defined constants
      default: GameModes.ONE_V_ONE,
      required: true,
    },
    winPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "filled"], // Either 'available' or 'filled'
      default: "available",
    },
    starting: {
      type: Number,
      required: true,
    },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Ensure the field references the User model
      },
    ],
    cardId: {
      type: String,
      required: false,
    },
    cardPassword: {
      type: String,
      required: false,
    },
    image: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Make sure this references the User who created the game, not the "Ship" model
    },
  },
  { timestamps: true }
);

// Export the model, ensuring it's defined once to prevent model compilation errors
export default mongoose.models.Games || mongoose.model("Games", GamesSchema);
