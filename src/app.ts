import "./config/env";
import "./config/db";
import "./models";

import constants from "./constants";

import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import router from "./router";
import errorHandler from "./middlewares/error-handler";

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(constants.port, () => {
  console.log(`[server] Server is running on port ${constants.port}`);
});
