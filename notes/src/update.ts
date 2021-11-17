import type { APIGatewayProxyHandler } from "aws-lambda";
import { validateBody, createHandler, response } from "helpers";

export const handler: APIGatewayProxyHandler = createHandler(async (event) => {
  const id = event.pathParameters?.id;

  if (!id) {
    return response(400, { message: "ID Not Found" });
  }

  const body = await validateBody(event.body);

  return response(200, { id, body, updatedAt: new Date() });
});
