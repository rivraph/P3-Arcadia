import type { RequestHandler } from "express";
import scoresRepository from "../scores/scoresRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const allUsers = await scoresRepository.readAll();
    if (allUsers == null) {
      res.sendStatus(404);
    } else {
      res.json(allUsers);
      console.info(
        "reception de tous les scores après fetch repository avant envoi vers Front",
        allUsers,
      );
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const userId = Number(req.params.id);
    const user = await scoresRepository.read(userId);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body;
    const id = Number(userData?.id);
    console.info("données recues du front envoyé à scoresRepo => ", userData);
    console.info("lecture id recue du front envoyé à scoresRepo => ", id);

    const userUpdateData = await scoresRepository.edit(id, userData);

    if (userUpdateData == null) {
      console.info("données renvoyées vers front", userUpdateData);
      res.sendStatus(404);
    } else {
      res.json(userUpdateData);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, update };
