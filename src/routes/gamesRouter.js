import { Router } from "express";
import {
  renderGamesPage,
  renderGamePage,
  renderNewGameForm,
} from "../controllers/gamesController.js";
import { validateId } from "../middlewares/validateId.js";

const gamesRouter = Router();

gamesRouter.get("/", renderGamesPage);
gamesRouter.get("/new", renderNewGameForm);
gamesRouter.get("/:id", validateId, renderGamePage);

gamesRouter.post("/new", renderNewGameForm);

export default gamesRouter;
