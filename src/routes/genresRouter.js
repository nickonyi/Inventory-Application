import { Router } from "express";
import {
  renderGenresPage,
  renderGamesByGenre,
  renderNewGenreForm,
  renderEditGenreForm,
  submitNewGenre,
} from "../controllers/genresControllers.js";
import { validateId } from "../middlewares/validateId.js";
import { validateName } from "../middlewares/validator.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);
genresRouter.get("/new", renderNewGenreForm);
genresRouter.get("/:id", validateId, renderGamesByGenre);
genresRouter.get("/:id/edit", validateId, renderEditGenreForm);

genresRouter.post("/new", validateName, submitNewGenre);

export default genresRouter;
