import dotenv from "dotenv";

dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

// example API call

app.get("/rover", async (req, res) => {
  try {
    const { name } = req.query;
    let photos = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/latest_photos?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());

    res.send({ photos });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
