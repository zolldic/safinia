import { describe, it, expect } from "@jest/globals";
import { jsonDB } from "../utilite/jsonClient.js";
import fs from "fs";

jest.mock("fs");

describe("jsonDB Constructor", () => {
  it("should initialize with the correct path", () => {
    const path = "test.json";
    const db = new jsonDB(path);
    expect(db._path).toBe(path);
  });

  it("should initialize with null data", () => {
    const db = new jsonDB("test.json");
    expect(db._data).toBeNull();
  });
});

describe("jsonDB Methods", () => {
  let db;

  beforeEach(() => {
    db = new jsonDB("test.json");
    db.connect = jest.fn();
    db.save = jest.fn();
    db._data = {};
  });

  describe("connect", () => {
    it("should read and parse the database file", () => {
      const fileData = '{"test": "data"}';
      fs.readFileSync.mockReturnValue(fileData);
      db.connect();
      expect(db._data).toEqual(JSON.parse(fileData));
    });

    it("should handle errors and set data to an empty object", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File not found");
      });
      db.connect();
      expect(db._data).toEqual({});
    });
  });

  describe("save", () => {
    it("should write data to the database file", () => {
      db._data = { test: "data" };
      db.save();
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "test.json",
        JSON.stringify(db._data, null, 2),
        "utf8"
      );
    });

    it("should handle errors during save", () => {
      fs.writeFileSync.mockImplementation(() => {
        throw new Error("Write error");
      });
      db.save();
      expect(console.error).toHaveBeenCalledWith(
        "Error saving to the database file:",
        "Write error"
      );
    });
  });

  describe("all", () => {
    it("should return all data if no collection is specified", () => {
      db._data = { test: "data" };
      expect(db.all()).toEqual(db._data);
    });

    it("should return the specified collection", () => {
      db._data = { collection: ["item1", "item2"] };
      expect(db.all("collection")).toEqual(["item1", "item2"]);
    });

    it("should return an empty array if the collection does not exist", () => {
      db._data = { collection: ["item1", "item2"] };
      expect(db.all("nonexistent")).toEqual([]);
    });

    it("should throw an error if the database is not connected", () => {
      db._data = null;
      expect(() => db.all()).toThrow("Database is not connected");
    });
  });

  describe("insertOne", () => {
    it("should insert data into the specified collection", () => {
      db.insertOne("collection", { id: 1, name: "item1" });
      expect(db._data.collection).toEqual([{ id: 1, name: "item1" }]);
      expect(db.save).toHaveBeenCalled();
    });

    it("should throw an error if the database is not connected", () => {
      db._data = null;
      expect(() =>
        db.insertOne("collection", { id: 1, name: "item1" })
      ).toThrow("Database is not connected");
    });
  });

  describe("deleteOne", () => {
    it("should delete the specified item from the collection", () => {
      db._data = { collection: [{ id: 1, name: "item1" }] };
      const result = db.deleteOne("collection", { id: 1 });
      expect(result).toBe(true);
      expect(db._data.collection).toEqual([]);
      expect(db.save).toHaveBeenCalled();
    });

    it("should return false if the item is not found", () => {
      db._data = { collection: [{ id: 1, name: "item1" }] };
      const result = db.deleteOne("collection", { id: 2 });
      expect(result).toBe(false);
      expect(db._data.collection).toEqual([{ id: 1, name: "item1" }]);
    });

    it("should throw an error if the database is not connected", () => {
      db._data = null;
      expect(() => db.deleteOne("collection", { id: 1 })).toThrow(
        "Database is not connected"
      );
    });
  });

  describe("modifyOne", () => {
    it("should modify the specified item in the collection", () => {
      db._data = { collection: [{ id: 1, name: "item1" }] };
      const result = db.modifyOne("collection", { id: 1 }, { name: "item2" });
      expect(result).toBe(true);
      expect(db._data.collection).toEqual([{ id: 1, name: "item2" }]);
      expect(db.save).toHaveBeenCalled();
    });

    it("should return false if the item is not found", () => {
      db._data = { collection: [{ id: 1, name: "item1" }] };
      const result = db.modifyOne("collection", { id: 2 }, { name: "item2" });
      expect(result).toBe(false);
      expect(db._data.collection).toEqual([{ id: 1, name: "item1" }]);
    });

    it("should throw an error if the database is not connected", () => {
      db._data = null;
      expect(() =>
        db.modifyOne("collection", { id: 1 }, { name: "item2" })
      ).toThrow("Database is not connected");
    });
  });
});
