import express from "express";
import handler from "./routes/handler.js";

const app = express();
app.use(express.json());

handler(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${port}`);
});
