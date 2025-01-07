import fs from "fs";

class jsonDB {
  constructor(path) {
    this._path = path;
    this._data = null;
  }

  connect() {
    try {
      const fileData = fs.readFileSync(this._path, "utf8");
      this._data = JSON.parse(fileData || "{}");
    } catch (error) {
      console.error(
        "Error reading or parsing the database file:",
        error.message
      );
      this._data = {};
    }
  }

  save() {
    try {
      fs.writeFileSync(this._path, JSON.stringify(this._data, null, 2), "utf8");
    } catch (error) {
      console.error("Error saving to the database file:", error.message);
    }
  }

  all(collection) {
    if (!this._data) throw new Error("Database is not connected");
    return collection ? this._data[collection] || [] : this._data;
  }

  insertOne(collection, data) {
    if (!this._data) throw new Error("Database is not connected");
    if (!this._data[collection]) this._data[collection] = [];
    this._data[collection].push(data);
    this.save();
  }

  deleteOne(collection, query) {
    if (!this._data) throw new Error("Database is not connected");
    if (!this._data[collection]) return false;
    const initialLength = this._data[collection].length;
    this._data[collection] = this._data[collection].filter(
      (item) => !Object.keys(query).every((key) => item[key] === query[key])
    );
    const deleted = this._data[collection].length < initialLength;
    if (deleted) this.save();
    return deleted;
  }

  modifyOne(collection, query, updates) {
    if (!this._data) throw new Error("Database is not connected");
    if (!this._data[collection]) return false;
    let modified = false;
    this._data[collection] = this._data[collection].map((item) => {
      if (Object.keys(query).every((key) => item[key] === query[key])) {
        modified = true;
        return { ...item, ...updates };
      }
      return item;
    });
    if (modified) this.save();
    return modified;
  }
}

const JSONClient = new jsonDB("db.json");
JSONClient.connect();

export { jsonDB }; /* test */
export default JSONClient;
