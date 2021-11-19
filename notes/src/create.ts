import { randomUUID } from "crypto";
import type { LambdaHandler } from "helpers";
import { createHandler } from "helpers";
import Joi from "joi";
import type { BaseNote } from "./note";

const joi = Joi.object({
  title: Joi.string(),
  description: Joi.string().required(),
});

async function validateBody(body: string | null) {
  try {
    const obj = JSON.parse(body ?? "");
    await joi.validateAsync(obj);

    return obj as BaseNote;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const createNote: LambdaHandler = async (event) => {
  const body = await validateBody(event.body);

  console.log("teste123");
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: randomUUID(),
      ...body,
      createdAt: new Date(),
    }),
  };
};

export const handler = createHandler(createNote);
