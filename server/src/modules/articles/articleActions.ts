import type { RequestHandler } from "express";

// Import access to data
import articleRepository from "./articleRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const articleData = await articleRepository.readAll();
    console.info(
      "reception des articles après articleRepo pour envoi vers Front",
      articleData,
    );
    // Respond with the items in JSON format
    res.json(articleData);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
