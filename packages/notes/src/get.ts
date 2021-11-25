import { createHandler, response, database as db } from "helpers";

// const invokeLambda = async (functionName: string, payload?: unknown) => {
//   try {
//     const response = await lambda
//       .invoke({
//         FunctionName: functionName,
//         InvocationType: "RequestResponse",
//         Payload: JSON.stringify(payload),
//       })
//       .promise();

//     return JSON.parse(response.Payload as string);
//   } catch (e) {
//     console.log("error", e);
//     return Error(JSON.stringify(e));
//   }
// };

export const handler = createHandler(async () => {
  const notes = await db.prisma.note.findMany();

  return response(200, notes);
});
