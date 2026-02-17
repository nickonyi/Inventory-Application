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

export const getGameDetails = async (gameId) => {
  const result = await db.query(
    `SELECT games.game_id,games.title,games.released,games.image,games.genre_id as genre,genres.name as genre_name,
    developers.name as developer,publishers.name as publisher,
    ARRAY_AGG(platforms.name ORDER BY platforms.name) AS platforms
    FROM games 
    LEFT JOIN genres on games.genre_id = genres.genre_id
    LEFT JOIN developers on games.developer_id = developers.developer_id
    LEFT JOIN publishers ON  games.publisher_id = publishers.publisher_id
    LEFT JOIN game_platforms ON games.game_id = game_platforms.game_id
    LEFT JOIN platforms ON game_platforms.platform_id = platforms.platform_id
    WHERE games.game_id = $1
    GROUP BY games.game_id,games.genre_id,genres.name,developers.name,publishers.name`,
    [gameId],
  );
  return result.rows[0] ?? null;
};

export const getAllGenres = async () => {
  const result = await db.query("SELECT * FROM genres ORDER BY name");
  return result.rows;
};

export const getAllPlatforms = async () => {
  const result = await db.query("SELECT * FROM platforms ORDER BY name");
  return result.rows;
};

export const getGenreById = async (genreId) => {
  const result = await db.query("SELECT * FROM genres WHERE genre_id = $1", [
    genreId,
  ]);
  return result.rows[0] ?? null;
};

export const getGamesByGenre = async (genreId) => {
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
    WHERE genres.genre_id = $1
    GROUP BY
      games.game_id,
      games.title,
      games.released,
      genres.name,
      developers.name,
      publishers.name
    ORDER BY games.title`,
    [genreId],
  );

  return result.rows;
};

export const getPlatformById = async (platformId) => {
  const result = await db.query(
    "SELECT * FROM platforms WHERE platform_id = $1",
    [platformId],
  );
  return result.rows[0] ?? null;
};

export const getGamesByPlatform = async (platformId) => {
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
    WHERE games.game_id IN (
      SELECT game_platforms.game_id
      FROM game_platforms
      WHERE game_platforms.platform_id = $1
    )
    GROUP BY games.game_id, genres.name, developers.name, publishers.name
    ORDER BY games.title`,
    [platformId],
  );
  return result.rows;
};

export const postNewGame = async (title, released, genreId, platformsId) => {
  const results = await db.query(
    `INSERT INTO games (title,released,genre_id) values ($1,$2,$3) returning game_id`,
    [title, released, genreId],
  );
  const gameId = results.rows[0].game_id;

  for (const platformId of platformsId) {
    if (platformId) {
      await db.query(
        "INSERT INTO game_platforms(game_id,platform_id) VALUES($1,$2)",
        [gameId, platformId],
      );
    }
  }
};

export const postNewGenres = async (name) => {
  return await db.query("INSERT INTO genres(name) VALUES ($1)", [name]);
};

export const postNewPlatform = async (name) => {
  return await db.query("INSERT INTO platforms(name) VALUES ($1)", [name]);
};

export const updateGameDetails = async (
  title,
  released,
  genreId,
  platformIds,
  gameId,
) => {
  await db.query(
    `UPDATE games SET title=$1,released=$2,genre_id=$3 WHERE game_id =$4`,
    [title, released, genreId, gameId],
  );

  await db.query(`DELETE FROM game_platforms WHERE game_id = $1`, [gameId]);

  for (const platformId of platformIds) {
    if (platformId) {
      await db.query(
        "INSERT INTO game_platforms (game_id,platform_id) VALUES($1,$2)",
        [gameId, platformId],
      );
    }
  }
};

export const deleteGame = async (gameId) => {
  await db.query(`DELETE FROM game_platforms WHERE game_id = $1`, [gameId]);
  return await db.query(`DELETE FROM games WHERE game_id =$1`, [gameId]);
};

export const updateGenreName = async (genreId, newGenreName) => {
  return await db.query("UPDATE genres SET name =$1 WHERE genre_id =$2", [
    newGenreName,
    genreId,
  ]);
};

export const updatePlatformName = async (platformId, newPlatformName) => {
  return await db.query(
    "UPDATE platforms SET name  = $1 WHERE platform_id = $2",
    [newPlatformName, platformId],
  );
};

export const deleteGenre = async (genreId) => {
  await db.query("UPDATE games SET genre_id = null WHERE genre_id = $1", [
    genreId,
  ]);
  return await db.query("DELETE from genres WHERE genre_id =$1", [genreId]);
};

export const deletePlatform = async (platformId) => {
  await db.query("DELETE from game_platforms WHERE platform_id = $1", [
    platformId,
  ]);
  return await db.query("DELETE from platforms WHERE platform_id =$1", [
    platformId,
  ]);
};
