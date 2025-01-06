import { v4 as uuid } from "uuid";

class User {
  constructor(email, password) {
    this._id = uuid();
    this._email = email;
    this._password = password;
    this._profile = {
      username: null,
      vision: null,
      mission: null,
      projects: [],
      notes: [],
    };
  }

  toDict() {
    return JSON.stringify({
      id: this._id,
      email: this._email,
      password: this._password,
      profile: this._profile,
    });
  }
}

export default User;
