import { randomUUID } from "crypto";
import type { LambdaHandler } from "helpers";
import { createHandler } from "helpers";
import { validateBody } from "./validate";

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
