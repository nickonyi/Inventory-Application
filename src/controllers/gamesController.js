import { getAllgames, getGameDetails } from "../db/query.js";

export const renderGamePage = async (req, res) => {
  const game = await getGameDetails(req.params.id);

  if (!game) {
    res.status("404").render("404");
    return;
  }

  res.render("games/game", { game });
};

export const renderGamesPage = async (req, res) => {
  const games = await getAllgames();
  res.render("games/games", { games });
};
