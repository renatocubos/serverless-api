import type { APIGatewayProxyHandler } from "aws-lambda";
import { response } from "helpers";

export const handler: APIGatewayProxyHandler = async () => {
  return response(200, { operation: "delete" });
};
