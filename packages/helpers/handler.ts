import type {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";

import { response } from "./response";

export type LambdaHandler = (
  event: APIGatewayProxyEvent,
  context: Context
) => Promise<APIGatewayProxyResult>;

type HandlerWrapper = (handler: LambdaHandler) => LambdaHandler;

export class BadRequest extends Error {}
export class Unauthorized extends Error {}

export const errorHandler: HandlerWrapper = (handler: LambdaHandler) => {
  return async function (event: APIGatewayProxyEvent, ctx: Context) {
    try {
      return await handler(event, ctx);
    } catch (error) {
      console.log({ error });
      if (error instanceof BadRequest) {
        return response(400, { message: error.message });
      }

      if (error instanceof Unauthorized) {
        return response(401, { message: error.message });
      }

      return response(500, { message: "Internal Error" });
    }
  };
};

export const createHandler: HandlerWrapper = handler => errorHandler(handler);
