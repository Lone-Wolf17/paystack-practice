const express = require('express');
const request = require('request');
const pug = require('pug');
const _ = require('lodash');
const path = require('path');
const connectDB = require("./config/db.js");
const morgan = require('morgan');
require('dotenv').config();
const Donor = require('./models/Donor.js');
const {initializePayment, verifyPayment} = require('./config/paystack')(request);

const app = express();

const apiBaseUrl = process.env.API_BASE_URL;


// Middleware
app.use(express.urlencoded({ extended: false })); // body parser
app.use(express.json()); // body parser
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, 'public/')));
app.set('view engine', pug);

// Connect to Mongo DB
connectDB();


// Routers


const port =  process.env.PORT || 3000

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${3000}`);
  });
  