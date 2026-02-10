import { Router } from "express";
import {
  renderGamesPage,
  renderGamePage,
  renderNewGameForm,
  submitNewGame,
  renderEditGameForm,
  changeGameDetails,
} from "../controllers/gamesController.js";
import { validateId } from "../middlewares/validateId.js";
import { validateGame } from "../middlewares/validator.js";
import { verifyAdminPassword } from "../middlewares/adminAuth.js";

const gamesRouter = Router();

gamesRouter.get("/", renderGamesPage);
gamesRouter.get("/new", renderNewGameForm);
gamesRouter.get("/:id", validateId, renderGamePage);
gamesRouter.get("/:id/edit", validateId, renderEditGameForm);

gamesRouter.post("/new", validateGame, submitNewGame);
gamesRouter.post(
  "/:id/edit",
  verifyAdminPassword,
  validateId,
  validateGame,
  changeGameDetails,
);

export default gamesRouter;
