import { v4 as uuid } from "uuid";

class Grant {
  constructor(title, discription, amount, deadline) {
    this._id = uuid();
    this._title = title;
    this._discription = discription;
    this._amount = amount;
    this._deadline = deadline;
  }

  toDict() {
    return JSON.stringify({
      id: this._id,
      title: this._title,
      discription: this._discription,
      amount: this._amount,
      deadline: this._deadline,
    });
  }
}

export default Grant;
