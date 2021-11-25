import type { APIGatewayProxyEvent } from "aws-lambda";
import { response, createHandler, database as db } from "helpers";
import { validateBody } from "./validate";

export async function createNote(event: APIGatewayProxyEvent) {
  const data = await validateBody(event.body);

  const result = await db.prisma.note.create({ data });

  return result;
}

export const handler = createHandler(async (event: APIGatewayProxyEvent) => {
  const note = await createNote(event);

  return response(201, note);
});
