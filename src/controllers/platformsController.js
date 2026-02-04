import {
  getAllPlatforms,
  getGamesByPlatform,
  getPlatformById,
  postNewPlatform,
} from "../db/query.js";
import { validationResult } from "express-validator";

export const renderPlatformsPage = async (req, res) => {
  const platforms = await getAllPlatforms();
  res.render("platforms/platforms", { platforms });
};

export const renderGamesByPlatform = async (req, res) => {
  const platform = await getPlatformById(req.params.id);

  if (!platform) {
    res.status(404).render("404");
    return;
  }

  const games = await getGamesByPlatform(req.params.id);
  res.render("platforms/platform", { games, platform });
};

export const renderNewPlatform = (req, res) => {
  res.render("platforms/newPlatformForm", { platform: { name: "" } });
};

export const submitNewPlatform = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.redirect("platforms/newPlatformForm", {
      errors: errors.array(),
      platform: {
        name: req.body.name,
        platform: req.body.platform,
      },
    });
    return;
  }
  await postNewPlatform(req.body.name);
  res.redirect("/platforms");
};
