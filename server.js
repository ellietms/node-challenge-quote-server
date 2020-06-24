const express = require("express");
const app = express();
const quotes = require("./quotes.json");

app.get("/",function (request, response) {
  response.send("Welcome to Ellie 's first back-end app")
})

app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random",function (request, response) {
  response.send(pickFromArray(quotes))
})

app.post("/favorite", function (req, res) {
  console.log(req);
  res.send(`My favorite is ${req.query.family}`);
});

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
