import { BadRequest } from "helpers";
import Joi from "joi";
import type { BaseNote } from "./note";

const joi = Joi.object({
  title: Joi.string(),
  description: Joi.string().required(),
});

export async function validateBody(body: string | null) {
  try {
    const obj = JSON.parse(body ?? "");
    await joi.validateAsync(obj);

    return obj as BaseNote;
  } catch (error) {
    if (error instanceof Error) {
      throw new BadRequest(error.message);
    }

    throw new BadRequest(JSON.stringify(error));
  }
}
