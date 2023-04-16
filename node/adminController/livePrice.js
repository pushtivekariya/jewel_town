const con = require("../database");
var bodyParser = require("body-parser");
const axios = require("axios");


const LivePriceFunc = async (req, res) => {
  try {
    const API_KEY = "0dd7eced3da90ece8a4e0620ee5b14b4"; // Replace with your Metals-API key
    const BASE_URL = "https://metals-api.com/api/latest";
    const CURRENCIES = "INR";
    const SYMBOLS = "XAU,XAG";

    const response = await axios.get(
      `${BASE_URL}?access_key=${API_KEY}&base=${CURRENCIES}&symbols=${SYMBOLS}`
    );
    const data = response.data;

    if (data.success) {
      const goldPrice = data.rates.XAU;
      const silverPrice = data.rates.XAG;
      res.send(
        `Gold price: ${goldPrice} ${CURRENCIES}\nSilver price: ${silverPrice} ${CURRENCIES}`
      );
    } else {
      console.log("not fetch live price....");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`Failed to fetch prices: ${error}`);
  }
};

module.exports = {
  LivePriceFunc,
};
