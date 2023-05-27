"use strict";

var express = require("express");

var https = require('https');

var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  var query = req.body.cityName;
  var apiKey = "2f3807d935d6395845f24b2ac26780ec";
  var unit = "metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      var imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The Temperature in " + query + " is " + temp + " Degree celsius</h1>");
      res.write("<image src=" + imageURL + ">");
      res.send();
    });
  });
});
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});