import type { DBClient } from "helpers";
import { Postgres } from "helpers";
import { createNote } from "../packages/notes/src/create";
import { mockEvent } from "./mocks/event";

describe("Notes", () => {
  let client: DBClient;
  let db: Postgres;

  beforeAll(async () => {
    db = new Postgres();

    client = await db.connect();
  });

  afterAll(async () => {
    await db.end();
  });

  it("Should create note", async () => {
    const note = await createNote(
      client,
      mockEvent({ title: "Title", description: "description" })
    );

    expect(note.title).toBe("Title");
    expect(note.description).toBe("description");
  });
});
