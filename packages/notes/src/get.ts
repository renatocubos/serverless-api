import { Lambda } from "aws-sdk";
const lambda = new Lambda();
import { createHandler, response } from "helpers";
import { addNumbers } from "math";

const invokeLambda = async (functionName: string, payload?: unknown) => {
  try {
    const response = await lambda
      .invoke({
        FunctionName: functionName,
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(payload),
      })
      .promise();

    return JSON.parse(response.Payload as string);
  } catch (e) {
    console.log("error", e);
    return Error(JSON.stringify(e));
  }
};

export const handler = createHandler(async () => {
  const res = await invokeLambda(`math-api-${process.env.STAGE ?? "dev"}-sum`, {
    pathParameters: { a: addNumbers(2, 3, 3, 3), b: addNumbers(3, 3, 3, 3) },
  });

  return response(200, { operation: "get", sum: JSON.parse(res.body).result });
});
