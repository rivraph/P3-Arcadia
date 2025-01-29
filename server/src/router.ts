import express from "express";

const router = express.Router();

/* ************************************************************************ */
// Define items-related routes
import gamesAction from "./modules/games/gamesActions";

router.get("/api/games", gamesAction.browse);

/* ************************************************************************* */

// Define users-related routes
import usersActions from "./modules/Users/usersActions";

router.get("/api/users", usersActions.browse);
router.post("/api/login", usersActions.browserForLogin);
router.get("/api/users/:id", usersActions.read);
router.post("/api/users", usersActions.add);
router.delete("/api/users/:id", usersActions.remove);
router.put("/api/users/:id", usersActions.update);

/* ************************************************************************* */

export default router;
