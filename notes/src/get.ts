import type { APIGatewayProxyHandler } from "aws-lambda";
import { response } from "helpers";
import { sum } from "math";

export const handler: APIGatewayProxyHandler = async () => {
  return response(200, { operation: "get", sum: sum(2, 3) });
};
