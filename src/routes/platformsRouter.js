import { Router } from "express";
import {
  renderPlatformsPage,
  renderGamesByPlatform,
  renderNewPlatform,
  submitNewPlatform,
  renderEditPlatformForm,
  changePlatformName,
  removePlatform,
} from "../controllers/platformsController.js";
import { validateId } from "../middlewares/validateId.js";
import { validateName } from "../middlewares/validator.js";
import { verifyAdminPassword } from "../middlewares/adminAuth.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);
platformsRouter.get("/new", renderNewPlatform);
platformsRouter.get("/:id", validateId, renderGamesByPlatform);
platformsRouter.get("/:id/edit", validateId, renderEditPlatformForm);

platformsRouter.post("/new", validateName, submitNewPlatform);
platformsRouter.post(
  "/:id/edit",
  verifyAdminPassword,
  validateId,
  validateName,
  changePlatformName,
);
platformsRouter.post(
  "/:id/delete",
  verifyAdminPassword,
  validateId,
  removePlatform,
);

export default platformsRouter;
