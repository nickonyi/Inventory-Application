import {
  getAllgames,
  getAllGenres,
  getAllPlatforms,
  getGameDetails,
  postNewGame,
} from "../db/query.js";
import { validationResult } from "express-validator";

export const renderGamePage = async (req, res) => {
  const game = await getGameDetails(req.params.id);

  if (!game) {
    res.status("404").render("404");
    return;
  }

  console.log(game);

  res.render("games/game", { game });
};

export const renderGamesPage = async (req, res) => {
  const games = await getAllgames();
  res.render("games/games", { games });
};

export const renderNewGameForm = async (req, res) => {
  const game = await getGameDetails(req.params.id);
  const genres = await getAllGenres();
  const platforms = await getAllPlatforms();

  res.render("games/newGameForm", { game, genres, platforms });
};

export const submitNewGame = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const genres = await getAllGenres();
    const platforms = await getAllPlatforms();
    const { genre, platforms: selectedPlatforms, released, title } = req.body;
    console.log(req.body);

    res.status(400).render("games/newGameForm", {
      errors: errors.array(),
      genre,
      genres,
      released,
      title,
      platforms,
      selectedPlatforms,
    });
  } else {
    const { genre, platforms, released, title } = req.body;
    const platformsArray = Array.isArray(platforms) ? platforms : [platforms];

    await postNewGame(title, released, genre, platformsArray);
    res.redirect("/");
  }
};

export const renderEditGameForm = async (req, res) => {
  const game = await getAllgames();

  if (!game) {
    res.status(404).render("404");
    return;
  }

  const genres = await getAllGenres();
  const platforms = await getAllPlatforms();
  res.render("games/gameEditForm", { game, genres, platforms });
};
