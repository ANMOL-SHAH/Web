//Working on this things
//Store data in local storage.
//Get data for dropdown feature
//Fix show results page
//Data Validation
//Create An Error Page takes message!
//clean data

/* global localStorage, */
const { response } = require('express');
const express = require('express');

const app = express();

const fetch = require("node-fetch");

app.use(express.static('public'));

const bodyParser = require('body-parser');

var params = require('params');

var localStorage = require('localStorage')

let ejs = require('ejs');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let ret_data = '';
let from = '';
let to = '';
let date = '';
let conversion = '';


//Home Page
app.get('/',(req,res)=>{
    // res.send("Hello! Welcome to CryptoAPI");
    localStorage.getItem("ANMOL","SHAH");
    res.render("home");
})

//Direct functional working
app.get('/data/:from-:to',(req,res)=>{
    console.log(req.params)
    fetch(`https://api.ratesapi.io/api/latest?base=${req.params.from}&symbols=${req.params.to}`)
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    res.send(data.base+" -> "+data.rates[req.params.to] + req.params.to);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    
    
})

//Output Page
app.get('/show-results',(req,res)=>{
    
    res.render('results',{from:localStorage.getItem('from'),to:localStorage.getItem('to'),data:JSON.parse(localStorage.getItem('ret_data')),date:localStorage.getItem('date'),conversion:localStorage.getItem('conv')});
})

//Open Port
app.listen(3000,()=>{
    console.log("Port 3000 in your service!")
})

//Post Request 
app.post('/check',(req,res)=>{
    from = req.body.from;
    to = req.body.to;
    if(from == '' || to == ''){
        res.send("error")
    }
    else{
        fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`)
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    localStorage.setItem('ret_data',JSON.stringify(data));
    localStorage.setItem('date',data.date);
    localStorage.setItem("from",from)
    localStorage.setItem('to',to);
    localStorage.setItem('conv',data.rates[to])
    res.redirect('/show-results')
    })
    .catch((error) => {
    console.error('Error:', error);
    });   

    }
})