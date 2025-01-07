import { describe, it, expect } from "@jest/globals";
import User from "../models/user.model.js";

describe("User Model", () => {
  it("should return an object with the correct structure", () => {
    const user = new User("test@example.com", "password123");
    const userDict = user.toDict();

    expect(userDict).toHaveProperty("id");
    expect(userDict).toHaveProperty("email");
    expect(userDict).toHaveProperty("password");
    expect(userDict).toHaveProperty("profile");
  });

  it("should return the correct values for id, email, and password", () => {
    const email = "test@example.com";
    const password = "password123";
    const user = new User(email, password);
    const userDict = user.toDict();

    expect(userDict.email).toBe(email);
    expect(userDict.password).toBe(password);
    expect(userDict.id).toBe(user._id);
  });

  it("should return the correct default profile structure", () => {
    const user = new User("test@example.com", "password123");
    const userDict = user.toDict();

    expect(userDict.profile).toEqual({
      username: null,
      vision: null,
      mission: null,
      projects: [],
      notes: [],
    });
  });
});
