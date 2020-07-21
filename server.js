const express = require("express");
const app = express();
const mongodb = require("mongodb");
const uri = process.env.DATABASE_URI;
require("dotenv").config();
console.log(process.env);
// advanced level: use lodash library
const cors = require("cors");
app.use(cors());
const lodash = require("lodash");

// Level 100
app.get("/", function (request, response) {
  const client = new mongodb.MongoClient(uri);
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
      response.json( quotes || error);
      client.close();
    });
    })
  })

app.get("/quotes/random", function (request, response) {
  
  response.send(lodash.sample(quotes));
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// Level 200
app.post("/quotes/search", function (req, res) {
  const searchResult = `${req.query.term}`;
  const filteredQuotes = quotes.filter((eachQuote) =>
    eachQuote.quote.includes(searchResult)
  );
  res.send(filteredQuotes);
});

app.post("/quotes/search/echo", function (req, res) {
  const yourWord = `${req.query.word}`;
  const allSearchResults = quotes.filter((eachQuote) =>
    eachQuote.quote.includes(yourWord)
  );
  res.send(
    `You said:` +
      `(` +
      yourWord +
      `)` +
      `  and all of the results are :` +
      JSON.stringify(allSearchResults)
  );
});

const port = process.env.PORT || 5000;
app.listen(port);