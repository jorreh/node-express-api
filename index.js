require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs-extra");

const app = express();

// Mongoose auth
const mongooseUser = process.env.MONGOOSE_USER;
const mongoosePwd = process.env.MONGOOSE_PWD;
const mongooseDB = process.env.MONGOOSE_DB;

const dbURI = `mongodb+srv://jorre:${mongoosePwd}@cluster0.badzabd.mongodb.net/${mongooseDB}?retryWrites=true&w=majority`;

const Questions = require("./models/questions.js");

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.static("./www/"));

app.get("/", function (req, res) {
  res.send("Hello");
});

app.get("/questions", async function (req, res) {
  let questions = await getQuestions();

  res.json({
    success: true,
    data: questions,
  });
});

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));

// ***

async function getQuestions() {
  let connectResp = await mongoose.connect(dbURI);
  let questions = await Questions.find();
  return questions;
}

function readJson(filePath, fileName) {
  let rawdata = fs.readFileSync(filePath + "/" + fileName);
  let jsonData = JSON.parse(rawdata);
  return jsonData;
}
