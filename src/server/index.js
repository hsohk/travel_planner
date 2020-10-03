const GEO_URL = "http://api.geonames.org/searchJSON?q="
const WEA_URL = "https://api.weatherbit.io/v2.0/history/daily?"
const IMG_URL = "https://pixabay.com/api/?image_type=photo&category=travel&min_width=640&orientation=horizontal&q="
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.static('dist'));
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fetch = require("node-fetch");

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

datas = [{
    "city" : "Seoul",
    "country" : "South Korea",
    "date" : "2020-10-30",
    "max_temp" :  17.4,
    "min)temp" :  5,
    "img" : "https://pixabay.com/get/57e7dc424252ae14f1dc846096293f7a1d3adae5534c704f752e7dd09244c659_640.jpg\n"
}];

const port = 8081;
const server = app.listen(port,()=>{console.log(`Runing server on localhost:${port}`)});

/**
 * /add endpoint
 * city,country,weather,max_temp,min_temp will be update via API
 */
app.post('/add',function(req,res){
    const newEntry={
        city : req.body.city,
        country : "unknown",
        date : req.body.date,
        weather : req.body.weather,
        temperature : {
            high : 99,  low: -99
        },
        sky : "cloudy",
        img : "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg"
    }
    updateInfo(newEntry)
        .then(()=>{
            if(newEntry.city!=="unknown")
                datas.push(newEntry);
        }).then(()=>{
            res.send(datas);
    })
})

/**
 * /edit endpoint
 * city,country,weather,max_temp,min_temp will be update via API
 */
app.post('/edit',function(req,res){
    const editEntry={
        city : req.body.city,
        country : "unknown",
        date : req.body.date,
        weather : req.body.weather,
        max_temp : 99,
        min_tem : -99,
        sky : "cloudy",
        img : "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg",
        lat : 0,
        lng : 0,
    }
    updateInfo(editEntry)
        .then(()=>{
            if(editEntry.city!== "unknown")
                datas[req.body.id]=editEntry;
        }).then(()=>{
        res.send(datas);
    })
})

app.post('/del',function(req,res){
    if (req.body.id > -1) datas.splice(req.body.id, 1)
})

app.get('/all', function(req,res){
    res.send(datas);
});

async function updateInfo(entry){
    await updateGeo(entry)
    .then(()=>updateWeather(entry))
        .then(()=> updateImg(entry))

}

/**
 * Update Geometric information
 * API : geonames
 * entry.city will be used as parameter
 */
async function updateGeo(entry){
    const res = await fetch(
        GEO_URL+entry.city +"&maxRows=1&username=" + process.env.GEO_ID
    );
    try{
        const result =  await res.json();
        if(result.totalResultsCount>1){
            entry.city = result.geonames[0].name;
            entry.country = result.geonames[0].countryName;
            entry.lat = result.geonames[0].lat;
            entry.lng = result.geonames[0].lng;
        } else {
            entry.city = "unknown"
        }
    } catch(e){
        console.log("error", e);
    }
}

/**
 * Update Weather information
 * API : weatherbit
 * entry.date/lat/lng wil be used as parameter
 * For typical weather check weather of 1 year before the target day
 */
async function updateWeather(entry){
    let date = new Date(entry.date);
    const startDate = (date.getFullYear()-1)+"-"+(date.getMonth()+1)+"-"+date.getDate();
    date.setDate(date.getDate()+1);
    const endDate = (date.getFullYear()-1)+"-"+(date.getMonth()+1)+"-"+date.getDate();
    const url = `${WEA_URL}lat=${entry.lat}&lon=${entry.lng}&start_date=${startDate}&end_date=${endDate}&key=${process.env.WEATHER_KEY}`
    console.log(url);
    const res = await fetch(
        url
    );
    try{
        const result =  await res.json();
        if(result.hasOwnProperty("data") && !result.hasOwnProperty("error")) {
            entry.max_temp = result.data[0].max_temp;
            entry.min_temp = result.data[0].min_temp;
        }
    } catch(e){
        console.log("error", e);
    }
}

/**
 * Update Image information
 * API : pixabay
 * entry.city(after updated by geo) will be used as parameter
 */
async function updateImg(entry){
    const url = IMG_URL+entry.city +"&key=" + process.env.IMG_KEY;
    console.log(url);

    const res = await fetch(
        IMG_URL+entry.city +"&key=" + process.env.IMG_KEY
    );
    try{
        const result =  await res.json();
        if(result.total>1){
            entry.img = result.hits[0].webformatURL;
        }
    } catch(e){
        console.log("error", e);
    }
}
