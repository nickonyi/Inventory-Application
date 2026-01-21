import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import indexRouter from "./routes/indexRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();
const PORT = process.env.PORT;


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);
app.get("/test", (req, res) => {
  res.send("Static test OK");
});

app.get("/{*splat}", (req, res) => {
  res.status(404).render("404");
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
