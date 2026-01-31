import {
  getAllPlatforms,
  getGamesByPlatform,
  getPlatformById,
} from "../db/query.js";

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
