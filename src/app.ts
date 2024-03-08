import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Open AI

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function queryAI(input: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Answer to the next query shortly (25 words max): ${input}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);
  return completion.choices[0].message.content;
}

// App

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/ai-test", async (req: Request, res: Response) => {
  const input = req.body;
  console.log("input", input);
  const aiOutput = await queryAI(input.query);
  res.status(200).json(aiOutput);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
