const CoinGeckoClient = require("../commons/coinGeckoClient");
const errMsg = require("../commons/errorMessages");

const fetchCoins = async (req, res) => {
  try {
    const coins = await CoinGeckoClient.coins.all();

    if (!coins) {
      res.status(309).send(errMsg.noCoinsFound);
    }

    res.send(coins);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchCoin = async () => {
  try {
    const coin = await CoinGeckoClient.coins.fetch("bitcoin");

    if (!coin) {
      res.status(309).send("Unable to locate coin in our system.");
    }

    res.send(coin);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  fetchCoins,
  fetchCoin,
};
