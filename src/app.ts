import "./config/env";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./router";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
