const mongoose = require("mongoose");
const config = require('config')
const dbURL = config.get('MongoDB.connectionString')
mongoose.Promise = require("bluebird");


const connect = mongoose.connect(dbURL, {useNewUrlParser:true}, (err)  => {
    console.log('mongodb connection successful')
});

module.exports = connect;