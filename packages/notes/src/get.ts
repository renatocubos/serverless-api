import { Lambda } from "aws-sdk";
import { createHandler, response, database as db } from "helpers";
const lambda = new Lambda();
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

  const notes = await db.prisma.note.findMany();

  return response(200, {
    operation: "get",
    sum: JSON.parse(res.body).result,
    notes,
  });
});
