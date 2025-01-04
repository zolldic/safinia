import fs from "fs";

class jsonDB {
  constructor(path) {
    this._path = path;
    this._data = [];
  }

  connect() {
    this._data = fs.readFileSync(this._path, "utf8");
  }

  all(collection) {
    const data = JSON.parse(this._data);
    return collection ? data[collection] : data;
  }
}

const JSONClient = new jsonDB("db.json");
JSONClient.connect();

export default JSONClient;
