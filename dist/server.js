// server/server.ts
import express3 from "express";
import * as Path from "node:path";
import request2 from "superagent";
import cors from "cors";

// server/routes/welcome.ts
import express from "express";
var router = express.Router();
router.get("/", (req, res) => {
  try {
    res.json({ statement: "Welcome to API Playground!" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Something went wrong");
    }
  }
});
var welcome_default = router;

// server/routes/marvel.ts
import express2 from "express";
import request from "superagent";
import crypto from "crypto";

// server/lib.ts
var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// server/routes/marvel.ts
import * as dotenv from "dotenv";
dotenv.config();
var router2 = express2.Router();
var privateKey = process.env.API_ACCESS_KEY;
var publicKey = `61512a89c9dd5233c2e86896d99e2f94`;
var apiUrl = "https://gateway.marvel.com/v1/public/comics";
router2.get("/", async (req, res) => {
  try {
    if (privateKey) {
      const modifier = `?orderBy=modified&limit=99&offset=${getRandomInt(
        0,
        2e3
      )}`;
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const generatedHash = crypto.createHash("md5").update(timestamp + privateKey + publicKey).digest("hex");
      const response = await request.get(
        `${apiUrl}${modifier}&ts=${timestamp}&apikey=${publicKey}&hash=${generatedHash}`
      );
      res.json(response.body);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message, "Error in the routes");
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Something went wrong with the routes");
    }
  }
});
var marvel_default = router2;

// server/server.ts
var server = express3();
server.use(cors());
server.use(express3.json());
if (process.env.NODE_ENV === "production") {
  server.use(express3.static(Path.resolve("./dist")));
  server.use("/assets", express3.static(Path.resolve("./dist/assets")));
  server.get("*", (req, res) => {
    res.sendFile(Path.resolve("./dist/index.html"));
  });
}
server.use("/api/v1/comics", marvel_default);
server.use("/api/v1/welcome", welcome_default);
server.get("/api/v1/affirmations", async (req, res) => {
  try {
    const response = await request2.get("https://www.affirmations.dev");
    res.json(response.body);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching affirmations:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
});
var server_default = server;

// server/index.ts
var port = process.env.PORT || 3e3;
server_default.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
server_default.on("error", (error) => {
  if (error instanceof Error) {
    console.error("Server error:", error.message);
  } else {
    console.error("Unknown server error occurred");
  }
});
