//host server
const express = require ("express");
const https=require("https");

//access to body parameters and variables from post
//get data from webpage into js
const bodyParser=require("body-parser");
var app = express();
//use bodyParser
//mode: urlencoded, text, json
//extended:
app.use(bodyParser.urlencoded({extended:true}))



app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post ("/index.html",(req,res) => {

    const url="https://api.openweathermap.org/data/2.5/weather?";
    const appid="52f6bc075b7959c03b5fc97b9ea68289";
    var city=req.body.cityName;
    var country=req.body.Country;
    var units=req.body.units;
    console.log(units);
    var queryURL=url+"q="+city+","+country+"&appid="+appid+"&units="+units;
       
    https.get(queryURL,(response)=>{
        //console.log(response.statusCode);
        //console.log(response.headers);
        response.on('data',(data)=>{
            const weatherData=JSON.parse(data);         
            const temp=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const feels=weatherData.main.feels_like;
            const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<h1><span style='text-transform:capitalize;'>"+city+"</span></h1> ");
            res.write("<img style='height:50px;'src="+imgURL+">");
            res.write("<p>"+description+ "</p>");
            if (units ==="metric"){
                res.write("<p>Temperature : "+temp+" &#x2103</p>");
                res.write("<p>Feels like : "+feels+" &#x2103</p>")
            }else{
                res.write("<p>Temperature : "+temp+" F</p>");
                res.write("<p>Feels like : "+feels+" F</p>")

            }
                
            
            
            res.send();
        })
    })
});



    

app.listen(3000,()=>{
    console.log("server runs on http://localhost:3000")
})
