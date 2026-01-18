import { getAllgames, getGamesByQuery } from "../db/query.js";

export const renderIndexPage = async (req, res) => {
  console.log(req.query.q);
};
