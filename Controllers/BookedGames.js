import mongoose from "mongoose";
import User from "../Models/UserModels.js";
import { GameNames } from "../utils/constants.js";
import { StatusCodes } from "http-status-codes";
import Games from "../Models/GamesModel.js";
import Booking from "../Models/BookingModel.js";
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid user ID" });
    }

    // Find user and populate bookings with game details
    const user = await User.findById(userId)
      .populate({
        path: "bookings",
        populate: {
          path: "gameId",
          model: "Games", // Ensure this matches the name used in the Games model
          select:
            "name image slots joinPrice mode winPrice status starting registeredUsers", // Select required fields
        },
      })
      .populate({
        path: "registeredGames",
        model: "Games", // Ensure this matches the name used in the Games model
        select:
          "name image slots joinPrice mode winPrice status starting registeredUsers", // Select required fields
      });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    // If there are no bookings or registered games
    if (user.bookings.length === 0 && user.registeredGames.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No bookings or registered games found for this user" });
    }

    // Format the response to include all game details
    const bookingsWithGamesDetails = user.bookings.map((booking) => ({
      bookedAt: booking.bookedAt,
      name: booking.gameId.name,
      image: booking.gameId.image,
      slots: booking.gameId.slots,
      joinPrice: booking.gameId.joinPrice,
      mode: booking.gameId.mode,
      winPrice: booking.gameId.winPrice,
      status: booking.gameId.status,
      starting: booking.gameId.starting,
      registeredUsers: booking.gameId.registeredUsers,
    }));

    const registeredGamesDetails = user.registeredGames.map((game) => ({
      name: game.name,
      image: game.image,
      slots: game.slots,
      joinPrice: game.joinPrice,
      mode: game.mode,
      winPrice: game.winPrice,
      status: game.status,
      starting: game.starting,
      registeredUsers: game.registeredUsers,
    }));

    res.status(StatusCodes.OK).json({
      msg: "User bookings and registered games retrieved",
      user: {
        name: user.name,
        email: user.email,
        bookings: bookingsWithGamesDetails,
        registeredGames: registeredGamesDetails,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};

export const getUserRegisteredGames = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid user ID" });
    }

    // Find user and populate registered games with game details
    const user = await User.findById(userId).populate({
      path: "registeredGames",
      model: "Games", // Ensure this matches the name used in the Games model
      select:
        "name image slots joinPrice mode winPrice status starting registeredUsers cardId cardPassword", // Select required fields
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    // Format the response to include all registered game details
    const registeredGamesDetails = user.registeredGames.map((game) => ({
      id: game._id, // Include the game ID
      name: game.name,
      image: game.image,
      slots: game.slots,
      joinPrice: game.joinPrice,
      cardId: game.cardId,
      cardPassword: game.cardPassword,
      mode: game.mode,
      winPrice: game.winPrice,
      status: game.status,
      starting: game.starting,
      registeredUsers: game.registeredUsers, // Include the registeredUsers field
    }));

    res.status(StatusCodes.OK).json({
      registeredGames: registeredGamesDetails,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};

export const getRegisteredUsersForGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid game ID" });
    }

    // Find the game and populate registered users
    const game = await Games.findById(gameId).populate({
      path: "registeredUsers",
      select: "name email mode slot status", // Select the fields to display for each user
    });

    if (!game) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Game not found" });
    }

    // Format the response to include registered users' details
    const registeredUsersDetails = game.registeredUsers.map((user) => ({
      name: user.name,
      mode: game.mode,
      email: user.email,
      status: user.status,
    }));

    res.status(StatusCodes.OK).json({
      game: {
        name: game.name,
        mode: game.mode,
        registeredUsers: registeredUsersDetails,
        mode: game.mode,
        slots: game.slots,

        registeredUsers: registeredUsersDetails,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Validate the booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid booking ID" });
    }

    // Find and delete the booking
    const booking = await Booking.findByIdAndDelete(bookingId);

    // Check if booking was found and deleted
    if (!booking) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Booking not found" });
    }

    // Send a success response
    res.status(StatusCodes.OK).json({ msg: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    // 1. Get total number of users
    const totalUsers = await User.countDocuments();

    // 2. Get the count of games created for each game name
    const gameCounts = await Games.aggregate([
      { $group: { _id: "$name", count: { $sum: 1 } } },
    ]);

    // 3. Get the count of bookings for each game name
    const bookingCounts = await Booking.aggregate([
      {
        $lookup: {
          from: "games", // Join with Games collection
          localField: "gameId",
          foreignField: "_id",
          as: "gameInfo",
        },
      },
      {
        $unwind: "$gameInfo",
      },
      {
        $group: {
          _id: "$gameInfo.name", // Group by game name
          bookingCount: { $sum: 1 },
        },
      },
    ]);

    // Structure the response for game counts and booking counts
    const gameCountsByName = {};
    const bookingCountsByName = {};

    // Fill the game counts
    gameCounts.forEach((game) => {
      gameCountsByName[game._id] = game.count;
    });

    // Fill the booking counts
    bookingCounts.forEach((booking) => {
      bookingCountsByName[booking._id] = booking.bookingCount;
    });

    // Ensure all game names from GameNames are included in the response, even if no games exist for that name
    Object.values(GameNames).forEach((name) => {
      if (!gameCountsByName[name]) {
        gameCountsByName[name] = 0;
      }
      if (!bookingCountsByName[name]) {
        bookingCountsByName[name] = 0;
      }
    });

    // Send the response with total users, game counts, and booking counts
    res.status(StatusCodes.OK).json({
      totalUsers,
      games: gameCountsByName,
      bookings: bookingCountsByName,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};