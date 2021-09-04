const express = require('express');
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const apiBaseUrl = process.env.API_BASE_URL;


// Middleware
app.use(express.urlencoded({ extended: false })); // body parser
app.use(express.json()); // body parser
app.use(morgan("tiny"));


// Connect to Mongo DB
connectDB();


// Routers



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${3000}`);
  });
  