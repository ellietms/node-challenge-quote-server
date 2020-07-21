require("dotenv").config();
const express = require("express");
const app = express();
const mongodb = require("mongodb");
const uri = process.env.DATABASE_URI;
// advanced level: use lodash library
const cors = require("cors");
app.use(cors());
const lodash = require("lodash");



// Level 100
app.get("/", function (request, response) {
  const client = new mongodb.MongoClient(uri,{ useNewUrlParser: true });
  client.connect(() =>{
  response.send("Welcome to Ellie 's quote app");
  client.close();
  })
});

app.get("/quotes", function (request, response) {
  const client = new mongodb.MongoClient(uri);
  client.connect(() => {
    const db = client.db("quotes");
    const collection = db.collection("quotes");
    collection.find().toArray((error, quotes) => {
      response.json(quotes || error);
      client.close();
    });
    })
  })

app.get("/quotes/random", function (request, response) {
  const client = mongodb.MongoClient(uri);
  client.connect(() => {
    const db = client.db("quotes");
    const collection = db.collection("quotes");
    collection.find().toArray((error,quotes) => {
      response.send(lodash.sample(quotes) || error);
      client.close();
    })
  })
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// Level 200
app.post("/quotes/search", function (req, res) {
  const client = new  mongodb.MongoClient(uri,{ useUnifiedTopology: true });
  client.connect(() => {
    const db = client.db("quotes");
    const collection = db.collection("quotes");
    collection.find({"quote" : {$regex : `.*${req.query.term}.*`}}).toArray((error,results) => {
      res.send(error || results);
      client.close();
    })
  })
});

app.post("/quotes/search/echo", function (req, res){
  const client = new mongodb.MongoClient(uri);
  console.log(req.query.term);
  client.connect(() => {
    const db = client.db("quotes");
    const collection = db.collection("quotes");
    collection.find({quote:req.query.term}).toArray((error,results) => {
      res.json(error || results);
      client.close();
    })
  })
});

const port = process.env.PORT || 5000;
app.listen(port);


