var express = require('express');
const aa = require('express-async-await');
const app = aa(express());
const helper = require('./helper');
const KrakenClient = require('kraken-api');
const kraken = new KrakenClient("not", "applicable");

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
};

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/shouldBuy', async function (request, response) {
  
  const factor = request.query.factor;
  const pair = request.query.pair;
  const signal = request.query.signal;

  if(!factor || !pair || !signal){
    response.send("facotr, pair or signal missing");
    return;
  }

  var candle = await helper.getCandle(kraken, pair);
  var shouldPlaceOrderResult = helper.shouldPlaceOrder(candle,signal,factor);
  
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({
    "result": shouldPlaceOrderResult
  }));
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
})
