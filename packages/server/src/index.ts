import path from "path";
import { Request, Response } from "express";
import express from "express";

const app = express();

require("dotenv-flow").config();

import database from "./config/database";
import { apiRouter } from "./modules/apiRouter";

// Parse URL-encoded bodies (as sent by HTML forms)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

//parse cookies sent via http requests
//const cookieParser = require('cookie-parser');
//app.use(cookieParser())

//use cors to accept other non domain websites to access api
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 8080;

createTablesIfNotExist();

app.use("/api", apiRouter);

// Serve the front.
const oneDayInMs = "86401000";
app.use(
  "/",
  express.static(path.resolve(path.join(__dirname, "../../client/build/")), {
    etag: false,
    maxAge: oneDayInMs,
  })
);

// We want to serve index.html for every path that are not matched by the api or static middleware.
// For example 'http://host/products/1000'.
app.get("*", function serveFront(_request: Request, response: Response) {
  response.set("Cache-control", "no-cache");
  response.set("last-modified", new Date().toUTCString());
  return response.sendFile(
    path.resolve(path.join(__dirname, "../../client/build/index.html")),
    { etag: false }
  );
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});

export default app;

function createTablesIfNotExist() {
  database.sync();
}

function handleError(err, res) {
  res.status(err.statusCode || 500).send(err.message || "Unkown error"); // TODO: remove stack when on PROD.
}
