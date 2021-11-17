import type { APIGatewayProxyHandler } from "aws-lambda/trigger/api-gateway-proxy";
import { randomUUID } from "crypto";
import { createHandler, response, validateBody } from "helpers";

export const handler: APIGatewayProxyHandler = createHandler(async (event) => {
  const body = await validateBody(event.body);

  console.log("teste");
  return response(200, {
    id: randomUUID(),
    ...body,
    createdAt: new Date(),
  });
});
