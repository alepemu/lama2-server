import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

// Open AI


// App

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const mockNoteData = {
  title: "Hello World",
  text: "This is a simple note",
};

app.get("/test", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json({ ...mockNoteData });
  }, 3000);
});

app.post("/ai-test", (req: Request, res: Response) => {
  const input = req.body;
  console.log(input);
  res.status(200).json("ok");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
