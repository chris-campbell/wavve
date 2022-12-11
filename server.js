require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

const { auth } = require("express-openid-connect");

const config = {
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  secret: process.env.SECRET,
};

app.use(auth(config));

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Successfully connected to port ${PORT}`);
});
