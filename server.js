// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 7000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// default tables (DATA)
// =============================================================
var tables = [{
  
  name: "Yoda",
  phoneNumber: "2013342212",
  email: "yoda@lucasfilm.com",
  uniqueID: "suckprequelsdo"
}, {
  name: "Kylo Ren",
  phoneNumber: "2024455515",
  email: "adamdriver@bigface.tv",
  uniqueID: "newcharacter"
}];


// Basic route that sends the user first to the AJAX Page

app.get("/", function(req, res) {
	console.log("test for index");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
	console.log("test for reserve");
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
	console.log("test for tables");
  res.sendFile(path.join(__dirname, "tables.html"));
});


// Create New Characters - takes in JSON input

app.post("/table", function(req, res) {
	console.log("test for new reservation");
  var newTable = req.body;
  newTable.uniqueID = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});

// 
app.get("/table", function(req, res) {
  var chosen = req.params.tables;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].userName) {
       return res.json(tables[i]);
      }
    }
    return res.json(false);
  }
  return res.json(tables);
});



// Here we start our server so that it can begin listening to client requests.
app.listen(PORT, function() {

  // The below statement is triggered (server-side) when a user visits the PORT URL
  console.log("Server listening on: http://localhost:%s", PORT);

});