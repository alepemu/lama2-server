import constants from "../constants";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: constants.openAI.apiKey });

let isReady = true;

export async function queryAI(input: string, typeId: number) {
  if (!isReady) {
    return {
      title: "Wait!",
      text: "I'm not ready yet! Wait for at least 15 seconds between AI requests.",
      typeId: 0,
    };
  }

  isReady = false;
  setTimeout(() => {
    isReady = true;
  }, 15000);

  const content =
    typeId === 0
      ? `Provide a brief answer to the next query: "${input}". (25 words max)`
      : `Respond to the next query with a concise JSON array: "${input}". (Up to 10 items, 10 words per item)`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  // console.log(">>", completion.choices[0].message.content);

  if (typeId === 1 && completion.choices[0].message.content) {
    let res = JSON.parse(completion.choices[0].message.content);
    // If res is an object, convert it to an array
    if (typeof res === "object" && !Array.isArray(res)) {
      res = Object.values(res).flat();
    }
    const array = res.map((item: string) => ({
      itemId: Date.now() + Math.floor(Math.random() * 1000),
      item,
    }));
    return { list: array };
  } else {
    return { text: completion.choices[0].message.content };
  }
}
