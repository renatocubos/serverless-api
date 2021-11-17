import Joi from "joi";
import type { BaseNote } from "../notes/src/note";

export class ValidationError extends Error {}

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
    throw new ValidationError(error.message);
  }
}
