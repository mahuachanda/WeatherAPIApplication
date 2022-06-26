const express= require('express');
const bodyParser = require('body-parser');

//var express = require('express');
var https = require('https');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    });

    

    //res.send("Server is running and up"); if u keep it you will get an error like ERR_HTTP_HEADERS_sENT



app.post("/", function(req, res){
    var query = req.body.cityName;
    const apiKey= "4552de8b40d1aab569ab7c0168c1b1e5";
     var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +" ";
    // var url = "https://api.openweathermap.org/data/2.5/weather?q=paris&appid=4552de8b40d1aab569ab7c0168c1b1e5";
    https.get(url, function(response){ 
        //console.log("status code: "+response.statusCode);
        response.on('data', function(data){
            const weatherData = JSON.parse(data);

            var temp = weatherData.main.temp;

            const weatherDesc = weatherData.weather[0].description;
            const icon =weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(weatherDesc);
            res.write("<p>The weather is currently "+weatherDesc + "</p>");
            res.write("<h1>The temperature in London is "+temp+" Kelvin</h1>");
            res.write("<img src = "+ imageURL+ ">");
            res.send();
        });
});
});


app.listen('3000',function(){
    console.log("server is running on 3000");
});