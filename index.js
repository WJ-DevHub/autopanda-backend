const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const objectId = require("mongodb").objectId;
const mongoClient = mongodb.MongoClient;

const mongoUtilities = require("./mongoutilities");

const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

let app = express();
app.use(express.json());
app.use(cors());

async function main() {
  // let db = await connect();
  await mongoUtilities.connect(MONGO_URI, "autopanda"); //switch to autopanda db

  const db = mongoUtilities.getDB();

  app.get("/vendordata", async (req, res) => {
    let vendorData = await db.collection("vendordata").find().toArray();
    res.status(200);
    res.send(vendorData);
  });

  app.get("/dishdata", async (req, res) => {
    let dishData = await db.collection("dishdata").find().toArray();
    res.status(200);
    res.send(dishData);
  });

  app.post("/vendordata", async (req, res) => {
    //@TODO by right deal with some error handling

    const results = await db.collection("vendordata").insertOne({
      vendor_id: req.body.vendor_id,
      vendortitle: req.body.vendortitle,
      vendorlogo: req.body.vendorlogo,
      vendorheader: req.body.vendorheader,
      rating: req.body.rating,
      tags: req.body.tags,
    });
    res.status(200);
    res.send(results);
  });
}

main();

app.listen(process.env.PORT || 10000, () => {
  console.log(`Server started..listing to PORT 8888`);
});
