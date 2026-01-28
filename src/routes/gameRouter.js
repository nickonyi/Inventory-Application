import { Router } from "express";
import {
  renderGamesPage,
  renderGamePage,
} from "../controllers/gamesController.js";
import { validateId } from "../middlewares/validateId.js";

const gamesRouter = Router();

gamesRouter.get("/", renderGamesPage);
gamesRouter.get("/:id", validateId, renderGamePage);

export default gamesRouter;
