const express = require("express");
const router = express.Router();

const coinController = require("../controllers/coinController");

router.get("/fetchCoins", coinController.fetchCoins);
router.post("/fetchCoin", coinController.fetchCoin);

module.exports = router;
