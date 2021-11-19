import type {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import type { PoolClient } from "pg";
import { Database } from "./database";
import { response } from "./response";

export type DBLambdaHandler = (
  event: APIGatewayProxyEvent,
  database: PoolClient,
  ctx: Context
) => Promise<APIGatewayProxyResult>;

export type DatabaseHandlerWrapper = (
  handler: DBLambdaHandler
) => LambdaHandler;

export type LambdaHandler = (
  event: APIGatewayProxyEvent,
  ctx: Context
) => Promise<APIGatewayProxyResult>;

type HandlerWrapper = (handler: LambdaHandler) => LambdaHandler;

export const createHandler: HandlerWrapper = (handler) => {
  return async function (event, context) {
    try {
      const result = await handler(event, context);

      return result;
    } catch (error) {
      /* log error */

      if (error instanceof Error) {
        return response(400, { message: error.message });
      }

      return response(500, { message: "Internal Error" });
    }
  };
};

export const createDBHandler: DatabaseHandlerWrapper = (handler) => {
  return async function (event, context) {
    let client;

    try {
      const db = new Database();
      client = await db.connect();
      const result = await handler(event, client, context);

      return result;
    } catch (error) {
      /* log error */

      if (error instanceof Error) {
        return response(400, { message: error.message });
      }

      return response(500, { message: "Internal Error" });
    } finally {
      if (client) {
        client.release();
      }
    }
  };
};
