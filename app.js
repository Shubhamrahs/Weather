const express=require("express");
const https=require("https");
const bodyParser=require("body-Parser");

const app =express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

    const query=req.body.cityName;
    const apikey="16d507ae67589b2b7e6a69980bf27ea7";
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +",Rajasthan,IND&appid="+ apikey +"&units="+ units;
    
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgurl= "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
           
            res.write("<p>The Weather is currently "+ weatherDescription +"</p>");
            res.write("<h1>The Temperature in "+ query +" is "+ temp + " degree celcius.</h1>");
            res.write("<img src=" + imgurl + ">");
            res.send();
        })
    });

})

app.listen("8080",function(req,res){
    console.log("server is running");
})
