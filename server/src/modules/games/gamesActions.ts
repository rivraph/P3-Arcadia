import type { RequestHandler } from "express";

// Import access to data
import gamesRepository from "./gamesRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const gamesData = await gamesRepository.readAll();
    console.info(
      "reception de games après fetch repository avant envoi vers Front",
      gamesData,
    );
    // Respond with the items in JSON format
    res.json(gamesData);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
