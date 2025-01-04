import express from "express";

import JSONClient from "./utilite/jsonClient.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hi",
  });
});

app.get("/api/grants", (req, res) => {
  // fetch all grants from database
  const data = JSONClient.all("grants");
  res.status(201).json(data);
});

const ORG = {
  name: "Salam",
  projects: [
    {
      title: "",
      duration: "",
    },
  ],
};

app.post("/api/profile", (req, res) => {
  // set org profile
});

app.post("/api/write-proposal", (req, res) => {
  // write proposal
});

/*
app.post("/api/grants/new", (req, res) => {
  // create new grant
});
*/

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
