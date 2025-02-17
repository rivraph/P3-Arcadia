import express from "express";

const router = express.Router();

/* ************************************************************************ */
// Define items-related routes
import gamesAction from "./modules/actions/gamesActions";

router.get("/api/games", gamesAction.browse);

/* ************************************************************************* */

// Define users-related routes
import usersActions from "./modules/actions/usersActions";

router.get("/api/users", usersActions.browse);
router.post("/api/login", usersActions.browserForLogin);
router.get("/api/users/:id", usersActions.read);
router.post("/api/users", usersActions.add);
router.delete("/api/users/:id", usersActions.remove);
router.put("/api/users/:id", usersActions.update);

/* ************************************************************************* */

/* ************************************************************************ */
// Define articles-related routes
import articleAction from "./modules/actions/articleActions";

router.get("/api/articles", articleAction.browse);

/* ************************************************************************* */
/* ************************************************************************ */
// Define scores-related routes
import scoresAction from "./modules/actions/scoresActions";

router.get("/api/scores", scoresAction.browse);
router.get("/api/scores/:id", scoresAction.read);
router.put("/api/scores/:id", scoresAction.update);

/* ************************************************************************* */

export default router;
