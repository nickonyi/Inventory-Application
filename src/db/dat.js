import fs from "fs";
import path from "path";
import url from "url";

const data = JSON.parse(
  fs.readFileSync(
    path.join(path.dirname(url.fileURLToPath(import.meta.url)), "data.json"),
    "utf-8",
  ),
);

console.log(data.length);
