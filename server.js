const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));


const DefaultSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed
});


const AllDataModel = mongoose.model("youtubealldatafile", DefaultSchema, "youtubealldatafile");


const createRoute = (routeName, Model) => {
  app.get(`/api/${routeName}`, async (req, res) => {
    try {
      const data = await Model.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};


createRoute("all", AllDataModel);

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
