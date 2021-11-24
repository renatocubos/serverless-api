import type {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";

import type { DBClient } from "./database";
import { Postgres } from "./database";
import { response } from "./response";

interface DBContext extends Context {
  db: DBClient;
}

export type DBLambdaHandler = (
  event: APIGatewayProxyEvent,
  context: DBContext
) => Promise<APIGatewayProxyResult>;

export type DatabaseHandlerWrapper = (
  handler: DBLambdaHandler
) => LambdaHandler;

export type LambdaHandler = (
  event: APIGatewayProxyEvent,
  context: Context
) => Promise<APIGatewayProxyResult>;

type HandlerWrapper = (handler: LambdaHandler) => LambdaHandler;

export class BadRequest extends Error {}
export class Unauthorized extends Error {}

export const createHandler: HandlerWrapper = handler => errorHandler(handler);

export const errorHandler: HandlerWrapper = (handler: LambdaHandler) => {
  return async function (event: APIGatewayProxyEvent, ctx: Context) {
    try {
      return await handler(event, ctx);
    } catch (error) {
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

export const withDB: DatabaseHandlerWrapper = handler => {
  return async function (event, context) {
    let client: DBClient;

    try {
      const pg = new Postgres();
      client = await pg.connect();
    } catch (error) {
      console.log(error);
      throw new Error("Could not connect to database");
    }

    const result = await handler(event, { ...context, db: client });
    client.release();
    return result;
  };
};
