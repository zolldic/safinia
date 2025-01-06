import { v4 as uuid } from "uuid";

class Grant {
  constructor(title, discription, objective, funding, location, deadline) {
    this._id = uuid();
    this._title = title;
    this._discription = discription;
    this._objective = objective;
    this._funding = funding;
    this._location = location;
    this._deadline = deadline;
  }

  toDict() {
    return {
      id: this._id,
      title: this._title,
      discription: this._discription,
      objective: this._objective,
      funding: this._funding,
      location: this._location,
      deadline: this._deadline,
    };
  }
}

export default Grant;
