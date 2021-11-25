import { createNote } from "../packages/notes/src/create";
import { mockEvent } from "./mocks/event";

describe("Notes", () => {
  it("Should create note", async () => {
    const note = await createNote(
      mockEvent({ title: "Title", description: "description" })
    );

    expect(note.title).toBe("Title");
    expect(note.description).toBe("description");
  });
});
