import type { APIGatewayProxyEvent } from "aws-lambda";
import type { DBClient } from "helpers";
import { response, createHandler, withDB } from "helpers";
import { validateBody } from "./validate";

export async function createNote(db: DBClient, event: APIGatewayProxyEvent) {
  const data = await validateBody(event.body);

  const result = await db.query<{ id: string }>(
    "INSERT INTO notes (title, description) VALUES ($1, $2) RETURNING id",
    [data.title, data.description]
  );

  return {
    id: result.rows[0]?.id,
    ...data,
    createdAt: new Date(),
  };
}

export const handler = createHandler(
  withDB(async (event, context) => {
    const note = await createNote(context.db, event);

    return response(201, note);
  })
);
