import { z } from "zod";

export const authSignUp = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
  }),
});

export const authSignIn = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(3),
  }),
});

export const userDelete = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export const notesOrder = z.object({
  body: z.object({
    order: z.array(z.string()),
  }),
});

export const notePost = z.object({
  body: z.object({
    typeId: z.number(),
    title: z.string(),
    text: z.string().optional(),
    list: z.array(z.string()).optional(),
    userId: z.string(),
  }),
});

export const notePut = z.object({
  params: z.object({
    noteId: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    text: z.string().optional(),
    list: z.array(z.string()).optional(),
    theme: z.string().optional(),
  }),
});
