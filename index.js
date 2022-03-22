import express from "express";
import { getAllSchools,createSchool, updateSchool, getSchoolById } from "./src/school.js";
const app = express();
app.use(express.json());

app.get("/schools", async (req, res) => {
  try {
    const result = await getAllSchools();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/schools/:id", async (req, res) => {
  try {
    const { id } = req.params
    const result = await getSchoolById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error)
    
  }
})

app.post("/schools", async (req, res) => {
  const school = req.body;

  try {
    const result = await createSchool(school);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update 

app.patch('/schools/:id', async (req, res) => {
  const { id } = req.params
  const updateInput = req.body

  if (!updateInput){
    res.status(400).send("Empty Body")
    return
  }
  try {
    const result = await updateSchool(id, updateInput)
    res.status(200).send(result)
  }catch (error){
    res.status(500).send(error)
  }
  })





const port = 5551;
app.listen(port, () => {
  console.log(`We are listening on port ${port}`);
});
