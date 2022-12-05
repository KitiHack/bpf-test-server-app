const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");
var bodyParser = require('body-parser')
 
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
let data = {};

app.listen(4000, () => console.log("API is running"));

app.get("/hello", (req, res) => {
  res.send({
    data: data
  });
});

app.post('/set-hello', (req, res) => {
  console.log(req.body.userAddress);
  const userAddress = req.body.userAddress;
  const isSubscribed = req.body.isSubscribed;

  data[userAddress] = {
    isSubscribed: isSubscribed
  };

  res.send({
    newData: data
  })
});
 