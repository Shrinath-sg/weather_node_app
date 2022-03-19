const request = require('postman-request')
// const express = require("express")

// const app = express();
// app.get("",(req,res)=>{
//     res.send('Hello there');
// })
// app.listen(3000,()=>{
//     console.log("Started at port 3000");
// })
const forecast = (latitude, longitude, callback) => {
    const url =  "http://api.weatherstack.com/current?access_key=1450254c27f06212cba23267c5be7ac1&query=" + latitude + "," + longitude + "&units=f"
    //'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            // app.get("/weather",(req,res)=>{
            //     res.send(response.body);
            // })
            const tempInCelcious = (response.body.current.temperature-32) * 5 / 9;
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + tempInCelcious.toPrecision(2) + " degress out.")
        }
    })
}

module.exports = forecast