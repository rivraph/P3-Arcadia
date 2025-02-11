import type { RequestHandler } from "express";

// Import access to data
import articleRepository from "./articleRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const articleData = await articleRepository.readAll();
    // Respond with the items in JSON format
    res.json(articleData);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
