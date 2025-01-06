import express from "express";
import handler from "./routes/handler.js";

const app = express();
app.use(express.json());

handler(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
