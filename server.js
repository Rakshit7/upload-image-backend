const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
require("dotenv").config();
const { generateURL, getAllImage, uploadImage } = require("./ImageUpload");
const { addLocation, getAllLocation } = require("./db.service");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "image/jpeg", limit: "10mb" }));

app.get("/secure-url", async (req, res) => {
  try {
    const fName = req.query.fileName;
    const response = await generateURL(fName);
    console.log("response", response);
    res.send({
      statusCode: 200,
      message: response,
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/upload", async (req, res) => {
  try {
    const fName = req.body.url;
    const response = await uploadImage(fName);
    res.send({
      statusCode: 200,
      message: response,
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/get-all-images", async (req, res) => {
  try {
    const response = await getAllImage();
    res.send({
      statusCode: 200,
      message: response,
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/add-location", async (req, res) => {
  try {
    console.log("request body", req);
    const response = await addLocation(req.body);
    return res.send(response);
  } catch (e) {
    console.log("e", e);
  }
});

app.get("/get-all-location", async (req, res) => {
  try {
    const response = await getAllLocation();
    return res.send(response);
  } catch (e) {
    console.log("e", e);
  }
});

app.listen(4000, () => {
  console.log("Listineing to port 4000");
});
