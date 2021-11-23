import type { APIGatewayProxyHandler } from "aws-lambda";
import { createHandler, response } from "helpers";
import { validateBody } from "./validate";

export const handler: APIGatewayProxyHandler = createHandler(async (event) => {
  const id = event.pathParameters?.noteID;

  if (!id) {
    return response(400, { message: event.pathParameters });
  }

  const body = await validateBody(event.body);

  return response(200, { id, ...body, updatedAt: new Date() });
});
