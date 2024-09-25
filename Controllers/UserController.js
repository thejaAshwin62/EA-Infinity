import User from "../Models/UserModels.js";
import Booking from "../Models/BookingModel.js";
import Games from "../Models/GamesModel.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import multer from "multer";
import { StatusCodes } from "http-status-codes";
dotenv.config();
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle image upload
const uploadMiddleware = upload.single("avatar");

export const updateUser = async (req, res) => {
  try {
    // Handle file upload
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const { email, password, name, status } = req.body;
      const updates = { email, name, status };

      if (password) {
        updates.password = password; // Ensure password is hashed before saving
      }

      let updatedUser = await User.findById(req.user.userId);

      if (req.file) {
        // Upload image to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
            { folder: "user_avatar" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          cloudinaryStream.write(req.file.buffer);
          cloudinaryStream.end();
        });

        const { secure_url, public_id } = uploadResult;

        // Add new avatar URL and public ID to updates object
        updates.avatar = secure_url;
        updates.avatarPublicId = public_id;

        // Delete old avatar if it exists
        if (updatedUser.avatarPublicId) {
          await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId); // Delete old avatar from Cloudinary
        }
      }

      // Update the user information
      updatedUser = await User.findByIdAndUpdate(req.user.userId, updates, {
        new: true,
        runValidators: true, // Ensure validators are applied
      });

      if (!updatedUser) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "User not found" });
      }

      // Remove password from response
      const userResponse = updatedUser.toObject();
      delete userResponse.password;

      res
        .status(StatusCodes.OK)
        .json({ msg: "User updated successfully", user: userResponse });
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};

// Book a game for a user
export const bookGameForUser = async (req, res) => {
  try {
    const { gameId, userId } = req.params;
    const { bookingDate } = req.body;

    // Validate the IDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(gameId)
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid ID" });
    }

    // Check if the user already has a booking
    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    if (user.bookings.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "You have already booked a game.",
      });
    }

    // Find the game
    const game = await Games.findById(gameId);
    if (!game) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Game not found" });
    }

    // Check if the game has available slots
    if (game.registeredUsers.length >= game.slots) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "No available slots for this game" });
    }

    // Create a new booking entry
    const booking = new Booking({ userId, gameId, bookingDate });
    await booking.save();

    // Update the game to add the user to registeredUsers
    game.registeredUsers.push(userId);
    if (game.registeredUsers.length >= game.slots) {
      game.status = "filled"; // Update the status to "filled" if slots are full
    }
    await game.save();

    // Update the user's bookings, registeredGames, and totalBookings
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { bookings: booking._id, registeredGames: gameId },
        $inc: { totalBookings: 1 }, // Increment totalBookings
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      msg: "Booking request submitted successfully",
      game: { ...game.toObject(), bookingDate },
    });
  } catch (error) {
    console.error("Error booking game:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name status");
    return res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};

export const allBooking = async (req, res) => {
  try {
    // Check if the user has admin privileges
    if (req.user.role !== "admin") {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "Unauthorized" });
    }

    // Fetch all bookings and populate userId with name and avatar, and gameId with name, joinPrice, mode, and winPrice
    const bookings = await Booking.find()
      .populate("userId", "name avatar") // Populate both name and avatar from the User model
      .populate("gameId", "name joinPrice mode winPrice starting") // Populate name, joinPrice, mode, and winPrice from the Game model
      .exec();

    // Format booking data
    const formattedBookings = bookings.map((booking) => ({
      bookingId: booking._id,
      userName: booking.userId ? booking.userId.name : "Unknown User",
      userAvatar: booking.userId ? booking.userId.avatar : "No Avatar", // Include the user's avatar
      gameName: booking.gameId ? booking.gameId.name : "Unknown Game",
      joinPrice: booking.gameId ? booking.gameId.joinPrice : "Unknown Price",
      gameMode: booking.gameId ? booking.gameId.mode : "Unknown Mode",
      winPrice: booking.gameId ? booking.gameId.winPrice : "Unknown Price",
      starting: booking.gameId ? booking.gameId.starting : "",
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    }));

    // Send the response
    res.status(StatusCodes.OK).json({ bookings: formattedBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};
