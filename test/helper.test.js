'use strict'

const helper = require('../helper');
const expect = require('chai').expect

it('helper.shouldPlaceOrder is false', async () => {

  var candle = {
    high: 7244.4,
    low: 7166,
    close: 7244.4,
    pair: "XXBTZUSD"
  }

  var shouldPlace = helper.shouldPlaceOrder(candle, 1.7, 6);

  expect(shouldPlace.shouldBuy).to.equal(false);
})

it('helper.shouldPlaceOrder is true', async () => {
  
    var candle = {
      high: 110,
      low: 95,
      close: 100,
      pair: "XXBTZUSD"
    }
  
    var shouldPlace = helper.shouldPlaceOrder(candle, 2, 5);
  
    expect(shouldPlace.shouldBuy).to.equal(true);
  })
