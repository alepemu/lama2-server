import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Open AI

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let isReady = true;

async function queryAI(input: string, typeId: number) {
  isReady = false;
  setTimeout(() => {
    isReady = true;
  }, 15000);

  // let textResponse;
  // if (typeId === 0) textResponse = "AI note response";
  // let listResponse;
  // if (typeId === 1)
  //   listResponse = [{ itemId: crypto.randomUUID(), item: "AI list response" }];

  // return { text: textResponse, list: listResponse, typeId };
  // return { text: 'whaaat', typeId: 0 }; // OK

  const content =
    typeId === 0
      ? `Provide a brief answer to the next query: ${input}. (25 words max)`
      : `Respond to the next query with a concise JSON array: ${input}. (Up to 10 items, 10 words per item)`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  // console.log(">>>", completion);
  // console.log(">>", completion.choices[0].message.content);

  if (typeId === 1 && completion.choices[0].message.content) {
    const res = JSON.parse(completion.choices[0].message.content);
    // console.log(">>>", res);
    const array = res.map((item: string) => ({
      itemId: crypto.randomUUID(),
      item,
    }));
    return { list: array, typeId };
  } else {
    return { text: completion.choices[0].message.content, typeId };
  }
}

// App

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/ai", async (req: Request, res: Response) => {
  console.log(req.body);
  const { input, typeId } = req.body;
  const output = isReady
    ? await queryAI(input, typeId)
    : {
        title: "Wait!",
        text: "I'm not ready yet! Wait for at least 15 seconds between AI requests.",
        typeId: 0,
      };
  console.log(">>>", output);
  res.status(200).json(output);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
