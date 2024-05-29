// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let iplData = [];

fs.createReadStream("IPL_Matches_Gravitas_AI_Problem_Statement_Data.csv")
  .pipe(csv())
  .on("data", (row) => {
    iplData.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

app.post("/getMatchDetails", (req, res) => {
  const { match_id } = req.body;
  const match = iplData.find((m) => m.id === match_id);
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ error: "Match not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
