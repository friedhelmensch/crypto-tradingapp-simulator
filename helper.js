exports.shouldPlaceOrder = function (candle, signal, factor) {

  const low_gap = Math.abs(((candle.close / candle.low) - 1) * 100);
  const high_gap = Math.abs(((candle.close / candle.high) - 1) * 100);
  const spread = low_gap + high_gap;
  const factored_high_gap = high_gap * factor;

  var shouldBuy = false;
  if (spread > signal) {
    if (factored_high_gap > spread) {
      shouldBuy = true;
    }
  }
  result = 
  {
    candle : candle,
    high_gap : high_gap,
    low_gap : low_gap,
    factored_high_gap : factored_high_gap,
    shouldBuy : shouldBuy
  }
  return result;
}

exports.getCandle = async function (kraken, pair) {

  var now = Date.now();
  var fourHourAgo = 4 * 60 * 60 * 1000;
  var startTime = (now - fourHourAgo) / 1000;

  var ohlcResponse = await kraken.api('OHLC', { pair: pair, interval: 240, since: startTime });

  if (ohlcResponse.result[pair].length > 1) {
    console.error(ohlcResponse.result[pair].length + " candles for : " + pair);
    return;
  }
  var candle = convertResponseToCandle(ohlcResponse, pair);

  return candle;
}

function convertResponseToCandle(response, pair) {
  var result = response.result[pair][0];
  var high = result[2] * 1;
  var low = result[3] * 1;
  var close = result[4] * 1;
  // * 1 to convert string to number		
  return { high: high, low: low, close: close, pair: pair }
} 