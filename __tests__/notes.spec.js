import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const note = "Test note";
  const tags = ["tag1", "tag2"];
  const expectedNote = {
    tags,
    content: note,
    id: Date.now(),
  };

  insertDB.mockResolvedValue(expectedNote);
  const result = await newNote(note, tags);
  expect(result).toEqual(expectedNote);
});

test("getAllNotes returns all notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  };
  getDB.mockResolvedValue(db);
  const result = await getAllNotes();
  expect(result).toBe(db.notes);
});

test("removeNote does nothing if id is not found", async () => {
  const result = await removeNote(1);
  expect(result).toBeUndefined();
});
