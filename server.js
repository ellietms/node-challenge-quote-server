require("dotenv").config();
const express = require("express");
const app = express();
const mongodb = require("mongodb");
const uri = process.env.DATABASE_URI;
const PORT = process.env.PORT;
// advanced level: use lodash library
const cors = require("cors");
app.use(cors());
const lodash = require("lodash");

// Level 100
app.get("/", function (request, response) {
  const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
  client.connect(() => {
    response.send("Welcome to Ellie 's quote app");
    client.close();
  });
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
  });
});

app.get("/quotes/random", function (request, response) {
  const client = mongodb.MongoClient(uri);
  client.connect(() => {
    const db = client.db("quotes");
    const collection = db.collection("quotes");
    collection.find().toArray((error, quotes) => {
      response.send(lodash.sample(quotes) || error);
      client.close();
    });
  });
});

// Level 200
app.post("/quotes/search", function (request, response) {
  const client = new mongodb.MongoClient(uri, { useUnifiedTopology: true });
  client.connect(() => {
    const db = client.db("quotes");
    const collection = db.collection("quotes");
    collection.find().toArray((error, quotes) => {
      const term = request.query.term;
      console.log(word);
      const filteredQuotes = quotes.filter((eachQuote) =>
        eachQuote.quote.includes(term)
      );
      response.send(error || filteredQuotes);
      client.close();
    });
  });
});

app.post("/quotes/search/echo", function (request, response) {
  const client = new mongodb.MongoClient(uri);
  client.connect(() => {
    const db = client.db("quotes");
    const collection = db.collection("quotes");
    collection.find().toArray((error, quotes) => {
      const word = request.query.word;
      const filteredQuotes = quotes.filter((eachQuote) =>
        eachQuote.quote.includes(word)
      );
      response.json(error || filteredQuotes);
      client.close();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
// const port = process.env.PORT || 5000;
// app.listen(port);
