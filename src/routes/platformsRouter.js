import { Router } from "express";
import {
  renderPlatformsPage,
  renderGamesByPlatform,
} from "../controllers/platformsController.js";
import { validateId } from "../middlewares/validateId.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);
platformsRouter.get("/:id", validateId, renderGamesByPlatform);

export default platformsRouter;
