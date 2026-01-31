import { getAllPlatforms } from "../db/query.js";

export const renderPlatformsPage = async (req, res) => {
  const platforms = await getAllPlatforms();
  res.render("platforms/platforms", { platforms });
};
