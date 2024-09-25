import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import Games from "../Models/GamesModel.js";
import { GameNames, GameModes } from "../utils/constants.js";
dotenv.config();
// Multer setup to handle in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle single image upload
const uploadMiddleware = upload.single("image");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createGames = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }

    try {
      const { name, joinPrice, winPrice, starting, slots, mode } = req.body;

      // Convert name to lowercase for validation
      const lowerCaseName = name.toLowerCase();

      // Validate the game name
      if (!Object.values(GameNames).includes(lowerCaseName)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid game name" });
      }

      // Normalize the mode value to lowercase for validation
      const lowerCaseMode = mode.toLowerCase();

      // Validate the game mode
      if (!Object.values(GameModes).includes(lowerCaseMode)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid game mode" });
      }

      let imageUrl = "";
      if (req.file) {
        // Upload image to Cloudinary
        const cloudinaryUpload = new Promise((resolve, reject) => {
          const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
            {
              folder: "game_images",
            },
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

        const cloudinaryResult = await cloudinaryUpload;
        imageUrl = cloudinaryResult.secure_url; // Get the URL of the uploaded image
      }

      const game = await Games.create({
        name: lowerCaseName, // Store the name in lowercase
        slots,
        joinPrice,
        winPrice,
        starting,
        mode: lowerCaseMode, // Store the mode in lowercase
        image: imageUrl, // Store the image URL in the database
      });

      res
        .status(StatusCodes.CREATED)
        .json({ message: "Game created successfully", game });
    } catch (error) {
      console.error("Error creating game:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  });
};

export const getGamesByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Validate the game name
    const validNames = Object.values(GameNames);
    if (!validNames.includes(name)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid game name" });
    }

    // Fetch games by name
    const games = await Games.find({ name });

    if (games.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No games found for this name" });
    }

    res.status(StatusCodes.OK).json({ games });
  } catch (error) {
    console.error("Error fetching games by name:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
// Other controller functions...

export const getAllGames = async (req, res) => {
  const games = await Games.find({});
  res.status(StatusCodes.OK).json({ games });
};

// Example controller for getting one game by ID
export const getOneGame = async (req, res) => {
  const { id } = req.params;
  const games = await Games.findById(id);
  if (!games) throw new NotFoundError(`No Games with id: ${id}`);

  res.status(StatusCodes.OK).json({ games });
};

// Example controller for updating a game
export const updateGame = async (req, res) => {
  const { id } = req.params;

  const updatedGame = await Games.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedGame) throw new NotFoundError(`No games with id: ${id}`);

  res.status(StatusCodes.OK).json({ msg: "Game modified", updatedGame });
};

// Example controller for deleting a game
export const deleteGame = async (req, res) => {
  const { id } = req.params;
  const removedGame = await Games.findByIdAndDelete(id);
  if (!removedGame) throw new NotFoundError(`No games with id: ${id}`);

  res.status(StatusCodes.OK).json({ msg: "Game deleted" });
};
