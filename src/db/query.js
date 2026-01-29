import * as db from "./pool.js";

export const getAllgames = async () => {
  const result =
    await db.query(`SELECT games.game_id,games.title,games.released,games.image,
        games.genre_id,genres.name as genre FROM games
        LEFT JOIN genres ON games.genre_id = genres.genre_id`);
  return result.rows;
};
export const getGamesByQuery = async (q) => {
  const like = `%${q}%`;
  const result = await db.query(
    `SELECT
      games.game_id,
      games.title,
      games.released,
      games.image,
      genres.name AS genre,
      developers.name AS developer,
      publishers.name AS publisher,
      ARRAY_AGG(platforms.name ORDER BY platforms.name) AS platforms
    FROM games
    LEFT JOIN genres ON games.genre_id = genres.genre_id
    LEFT JOIN developers ON games.developer_id = developers.developer_id
    LEFT JOIN publishers ON games.publisher_id = publishers.publisher_id
    LEFT JOIN game_platforms ON games.game_id = game_platforms.game_id
    LEFT JOIN platforms ON game_platforms.platform_id = platforms.platform_id
    WHERE games.title ILIKE $1
      OR developers.name ILIKE $1
      OR publishers.name ILIKE $1
    GROUP BY
      games.game_id,
      games.title,
      games.released,
      genres.name,
      developers.name,
      publishers.name
    ORDER BY games.title`,
    [like],
  );

  return result.rows;
};

export const getGameDetails = async (id) => {
  const result = await db.query(
    `SELECT games.game_id,games.title,games.released,games.image,games.genre_id as genre,genres.name as genre_name,
    developers.name as developers,pulishers.name as publiher`,
  );
};
