import { getAllGenres } from "../db/query.js";

export const renderGenresPage = async (req, res) => {
  const genres = await getAllGenres();

  res.render("genres/genres", { genres });
};
