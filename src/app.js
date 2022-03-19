const express = require("express")
const geocode = require('/Users/apple/node/weather_app/web_servers/utils/geocode')
const forecast = require('/Users/apple/node/weather_app/web_servers/utils/forecast')
const port = process.env.PORT || 3000

const app = express();
app.get("",(req,res)=>{
    res.send('Hello there');
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({error: "Please provide address."})
    }
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error: error}) 
        }
        // res.send(req.query.address);
        forecast(data.latitude, data.longitude, (error, forcasetData) => {
            if(error){
                return res.send({error: error})
            }
            // console.log('Data', data.location)
            // console.log(forcasetData)
            res.send({weather: forcasetData,address: req.query.address,location:data.location});
        })
    })
})
app.listen(port,()=>{
    console.log("Started at port" + port);
})