import { Router } from "express";
import {
  renderGenresPage,
  renderGamesByGenre,
} from "../controllers/genresControllers.js";
import { validateId } from "../middlewares/validateId.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);
genresRouter.get("/:id", validateId, renderGamesByGenre);

export default genresRouter;
