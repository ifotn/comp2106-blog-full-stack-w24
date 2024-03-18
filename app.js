const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// create express app & set all content to json
const app = express();
app.use(bodyParser.json());

// db conn
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

mongoose.connect(process.env.CONNECTION_STRING, {})
.then((res) => { console.log ('Connected to MongoDB'); })
.catch((err) => { console.log (`DB Connection Failed ${err}`); });

// enable CORS for angular client app BEFORE controllers
const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
}));

// map routes
const postsController = require('./controllers/posts');
app.use('/api/posts', postsController);

// start server
app.listen(3000);
module.exports = app;