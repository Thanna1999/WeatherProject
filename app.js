const express = require("express");
const https = require('https');

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "2f3807d935d6395845f24b2ac26780ec";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit +""
    https.get(url, (response) => {
            console.log(response.statusCode);

            response.on("data", function (data) {
                const weatherData = JSON.parse(data)
                const temp = weatherData.main.temp
                const weatherDescription = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                res.write("<p>The weather is currently " + weatherDescription + "</p>")
                res.write("<h1>The Temperature in " + query +" is " + temp + " Degree celsius</h1>")
                res.write("<image src=" + imageURL + ">")
                res.send()
              })
        })

})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
  });
