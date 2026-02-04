import { Router } from "express";
import {
  renderPlatformsPage,
  renderGamesByPlatform,
  renderNewPlatform,
  submitNewPlatform,
} from "../controllers/platformsController.js";
import { validateId } from "../middlewares/validateId.js";
import { validateName } from "../middlewares/validator.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);
platformsRouter.get("/new", renderNewPlatform);
platformsRouter.get("/:id", validateId, renderGamesByPlatform);

platformsRouter.post("/new", validateName, submitNewPlatform);

export default platformsRouter;
