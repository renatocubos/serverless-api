import type { APIGatewayProxyHandler } from "aws-lambda";
import type { LambdaHandler } from "helpers";
import { createHandler, response } from "helpers";

export function addNumbers(...args: number[]) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

export const sum: LambdaHandler = async (event) => {
  if (!event.pathParameters) {
    return response(400, {
      message: "Missing path parameters",
    });
  }

  const { a, b } = event.pathParameters;

  let aNumber, bNumber;

  if (!a || !b) {
    return response(400, {
      message: "Missing path parameters",
    });
  }

  try {
    aNumber = parseInt(a, 10);
    bNumber = parseInt(b, 10);
  } catch (error) {
    return response(400, {
      message: "It was not possible to parse the given number",
    });
  }

  return response(200, { result: addNumbers(aNumber, bNumber) });
};

export const handler: APIGatewayProxyHandler = createHandler(sum);
