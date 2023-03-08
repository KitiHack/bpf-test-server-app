const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");
var bodyParser = require('body-parser')
 
var app = express()

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
let data = {};

app.listen(4000, () => console.log("API is running"));

app.get("/subscription-data", (req, res) => {
  res.send({
    data: data
  });
});

app.post('/astrus-webhook', (req, res) => {
  console.log(req.body.userAddress);
  const userAddress = req.body.userAddress;
  const isSubscribed = req.body.isSubscribed;
  const chain = req.body.chain;
  const event = req.body.lastEvent;

  const prevEvents = data[userAddress] ? data[userAddress].events : [];

  data[userAddress] = {
    isSubscribed: isSubscribed,
    chain: chain,
    events: prevEvents.push(event)
  };

  res.send({
    newData: data
  })
});
 