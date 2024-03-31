import "./config/env";
import "./config/db";
import "./models";

import constants from "./constants";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./router";

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(constants.port, () => {
  console.log(
    `[server] Server is running at http://localhost:${constants.port}`
  );
});
