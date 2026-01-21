import { getAllgames, getGamesByQuery } from "../db/query.js";

export const renderIndexPage = async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (q) {
    const games = await getGamesByQuery(q);
    res.render("searchResults", { games, q });
  } else {
    const games = await getAllgames();
    console.log(games);

    res.render("index", { games, q });
  }
};
