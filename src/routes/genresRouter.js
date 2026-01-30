import { Router } from "express";
import { renderGenresPage } from "../controllers/genresControllers.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);

export default genresRouter;
