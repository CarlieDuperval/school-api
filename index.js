import express from "express";
import { getAllSchools, createschool } from "./src/school.js";
const app = express();
app.use(express.json());

app.get("/schools", async (rep, res) => {
  try {
    const result = await getAllSchools();
    res.status(202).send(result);
  } catch (error) {
    res.status(501).send(error);
  }
});

app.post("/schools", async (rep, res) => {
  const school = rep.body;

  try {
    const result = await createschool(school);
    res.status(203).send(result);
  } catch (error) {
    res.status(502).send(error);
  }
});

const port = 5551;
app.listen(port, () => {
  console.log(`We are listening on port ${port}`);
});
