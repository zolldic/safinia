import { describe, it, expect } from "@jest/globals";
import Grant from "../models/grants.model";

describe("Grant Model", () => {
  it("should return an object with the correct structure", () => {
    const grant = new Grant(
      "Title",
      "Description",
      "Objective",
      1000,
      "Location",
      "2023-12-31"
    );
    const grantDict = grant.toDict();

    expect(grantDict).toHaveProperty("id");
    expect(grantDict).toHaveProperty("title");
    expect(grantDict).toHaveProperty("discription");
    expect(grantDict).toHaveProperty("objective");
    expect(grantDict).toHaveProperty("funding");
    expect(grantDict).toHaveProperty("location");
    expect(grantDict).toHaveProperty("deadline");
  });

  it("should return the correct values for title, description, objective, funding, location, and deadline", () => {
    const title = "Title";
    const discription = "Description";
    const objective = "Objective";
    const funding = 1000;
    const location = "Location";
    const deadline = "2023-12-31";
    const grant = new Grant(
      title,
      discription,
      objective,
      funding,
      location,
      deadline
    );
    const grantDict = grant.toDict();

    expect(grantDict.title).toBe(title);
    expect(grantDict.discription).toBe(discription);
    expect(grantDict.objective).toBe(objective);
    expect(grantDict.funding).toBe(funding);
    expect(grantDict.location).toBe(location);
    expect(grantDict.deadline).toBe(deadline);
    expect(grantDict.id).toBe(grant._id);
  });
});
