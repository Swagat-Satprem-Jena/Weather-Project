//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    app.use(express.static(__dirname + "/"));
});

app.post("/", function(req, res){
    // console.log(req.body);
    var city = req.body.cityName;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=";
    url = url + city;
    url += "&appid=4bcb723ef832f30a1ad00a86aa59cef2&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const f_temp = weatherData.main.feels_like;
            const des = weatherData.weather[0].description;
            const icon_code = weatherData.weather[0].icon;
            var icon_url = "http://openweathermap.org/img/wn/" + icon_code + "@2x.png";
            console.log(weatherData);
            res.write("<h1>The temperature of " + city + " is " + temp + " degree Celcius.</h1>");
            res.write("<p>It feels like " + f_temp + " degree Celcius. The weather is " + des + ".</p>");
            res.write("<img src='" + icon_url + "' alt='weather-icon'>");
            res.send();
        });
    });
    // res.send("Saamne Dekhiye Camera hai :)");
    
});

app.listen(3000, function(){
    console.log("Server started at Port 3000.");
});