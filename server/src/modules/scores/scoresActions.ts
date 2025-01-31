import type { RequestHandler } from "express";
import scoresRepository from "../scores/scoresRepository";

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
    console.info(
      "req.body recue dans le back envoyé à usersRepo => ",
      userData,
    );
    console.info("lecture id recue dans le back envoyé à usersRepo => ", id);

    const userUpdateData = await scoresRepository.edit(id);

    if (userUpdateData == null) {
      console.info("données renvoyés vers front", userUpdateData);
      res.sendStatus(404);
    } else {
      res.json(userUpdateData);
    }
  } catch (err) {
    next(err);
  }
};

export default { read, update };
