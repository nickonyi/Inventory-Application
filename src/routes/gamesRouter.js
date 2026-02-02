import { Router } from "express";
import {
  renderGamesPage,
  renderGamePage,
  renderNewGameForm,
  submitNewGame,
} from "../controllers/gamesController.js";
import { validateId } from "../middlewares/validateId.js";
import { validateGame } from "../middlewares/validator.js";

const gamesRouter = Router();

gamesRouter.get("/", renderGamesPage);
gamesRouter.get("/new", renderNewGameForm);
gamesRouter.get("/:id", validateId, renderGamePage);

gamesRouter.post("/new", validateGame, submitNewGame);

export default gamesRouter;
