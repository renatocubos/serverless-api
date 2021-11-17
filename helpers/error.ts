import type {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { response } from "./response";
import { ValidationError } from "./validate";

type LambdaHandler = (
  event: APIGatewayProxyEvent,
  ctx: Context,
  cb?: () => void
) => Promise<APIGatewayProxyResult>;

type HandlerWrapper = (handler: LambdaHandler) => LambdaHandler;

export const createHandler: HandlerWrapper = (handler) => {
  return async function (event, context) {
    try {
      const result = await handler(event, context);

      return result;
    } catch (error) {
      /* log error */

      if (error instanceof ValidationError) {
        return response(400, { message: error.message });
      }

      return response(500, { message: "Internal Error" });
    }
  };
};
