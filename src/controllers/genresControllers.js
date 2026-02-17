import {
  getAllGenres,
  getGenreById,
  getGamesByGenre,
  postNewGenres,
} from "../db/query.js";
import { validationResult } from "express-validator";

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

export const renderNewGenreForm = (req, res) => {
  console.log("the form call");

  res.render("genres/newGenreForm", { genre: { name: "" } });
};

export const submitNewGenre = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("genres/newGenreForm", {
      errors: errors.array(),
      genre: {
        genre: { name: req.body.name },
        name: req.body.name,
      },
    });
    return;
  }
  await postNewGenres(req.body.name);
  res.redirect("/genres");
};

export const renderEditGenreForm = async (req, res) => {
  const genre = await getGenreById(req.params.id);

  if (!genre) {
    res.status(404).render("404");
    return;
  }
  res.render("genres/genreEditForm", { genre });
};
