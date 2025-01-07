import geni from "../utilite/gemini.js";
import JSONClient from "../utilite/jsonClient.js";
import Grant from "../models/grants.model.js";

export default function handler(router) {
  const BASE = "/api/v1";

  // generate new concept note
  router.post(`${BASE}/concept/new`, async (req, res) => {
    try {
      const data = req.body.data;
      if (!data) {
        return res
          .status(400)
          .json({ error: "Data for concept note is required" });
      }
      const note = await geni.generateConceptNote(data);
      return res.status(201).json({ message: "Concept note generated", note });
    } catch (error) {
      console.error("Error generating concept note:", error);
      return res.status(500).json({ error: "Failed to generate concept note" });
    }
  });

  /* ************************************************************************* */

  // create a new grant
  router.post(`${BASE}/grants/new`, async (req, res) => {
    try {
      const { title, description, objective, funding, location, deadline } =
        req.body;

      // Validate required fields
      if (
        !title ||
        !description ||
        !objective ||
        !funding ||
        !location ||
        !deadline
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const grant = new Grant(
        title,
        description,
        objective,
        funding,
        location,
        deadline
      );
      JSONClient.insertOne("grants", grant.toDict());
      return res.status(201).json({ message: "Grant created successfully" });
    } catch (error) {
      console.error("Error creating grant:", error);
      return res.status(500).json({ error: "Failed to create grant" });
    }
  });

  // fetch all grants in database
  router.get(`${BASE}/grants`, async (req, res) => {
    try {
      const data = JSONClient.all("grants");
      return res.status(200).json({ grants: data });
    } catch (error) {
      console.error("Error fetching grants:", error);
      return res.status(500).json({ error: "Failed to fetch grants" });
    }
  });

  // fetch a single grant by title
  router.get(`${BASE}/grants/:title`, async (req, res) => {
    try {
      const { title } = req.params;
      const grants = JSONClient.all("grants");
      const grant = grants.find((g) => g.title === title);

      if (!grant) {
        return res.status(404).json({ error: "Grant not found" });
      }

      return res.status(200).json({ grant });
    } catch (error) {
      console.error("Error fetching grant:", error);
      return res.status(500).json({ error: "Failed to fetch grant" });
    }
  });

  // modify a grant by title
  router.put(`${BASE}/grants/:title`, async (req, res) => {
    try {
      const { title } = req.params;
      const updates = req.body;

      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No updates provided" });
      }

      const modified = JSONClient.modifyOne("grants", { title }, updates);

      if (!modified) {
        return res.status(404).json({ error: "Grant not found" });
      }

      return res.status(200).json({ message: "Grant updated successfully" });
    } catch (error) {
      console.error("Error updating grant:", error);
      return res.status(500).json({ error: "Failed to update grant" });
    }
  });

  // delete a grant by title
  router.delete(`${BASE}/grants/:title`, async (req, res) => {
    try {
      const { title } = req.params;

      const deleted = JSONClient.deleteOne("grants", { title });

      if (!deleted) {
        return res.status(404).json({ error: "Grant not found" });
      }

      return res.status(200).json({ message: "Grant deleted successfully" });
    } catch (error) {
      console.error("Error deleting grant:", error);
      return res.status(500).json({ error: "Failed to delete grant" });
    }
  });
}
