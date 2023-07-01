const express = require("express");
const connectDb = require("./DB/db");

const path = require("path");
const main = require("./Routes/main");
const bodyParser = require('body-parser');

const app = express();
require("dotenv").config();

const Port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + "Views")))
app.use(express.static('./Public'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/api/todo', main);

connectDb()
    .then(() => {
        app.listen(Port, console.log(`app listening to port ${Port}`))
    })
    .catch((e) => {
        console.log(e);
    })