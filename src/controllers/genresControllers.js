import { getAllGenres, getGenreById, getGamesByGenre } from "../db/query.js";

export const renderGenresPage = async (req, res) => {
  const genres = await getAllGenres();

  res.render("genres/genres", { genres });
};

export const renderGamesByGenre = async (req, res) => {
  const genre = await getGenreById(req.params.id);

  if (!genre) {
    res.status(404).render("404");
    return;
  }

  const games = await getGamesByGenre(req.params.id);
  res.render("genres/genre", { games, genre });
};
