import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Open AI

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let isReady = true;

async function queryAI(input: string, type: string) {
  isReady = false;
  setTimeout(() => {
    isReady = true;
  }, 15000);

  const content =
    type === "note"
      ? `Answer to the next query shortly (25 words max): ${input}`
      : `Answer to the next query shortly in an array format (10 items and 10 words per item max): ${input}`;

  // return "AI response";
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);

  if (type === "list" && completion.choices[0].message.content) {
    const array = JSON.parse(completion.choices[0].message.content);
    return array;
  }

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
  const aiOutput = isReady
    ? await queryAI(input.query, input.type)
    : "I'm not ready yet! Wait for 15 seconds between AI requests.";
  res.status(200).json(aiOutput);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
