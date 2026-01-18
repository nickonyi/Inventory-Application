import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async (text, params = []) => {
  return pool.query(text, params);
};
