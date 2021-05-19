// const { optional } = require('joi');
const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 5,
});

mongoose.connection.on('error', (err) => {
    console.log(`Error: ${err.message}`);
})
mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
})

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Connection to DB closed and app rerminated');
        process.exit()

    })
})

module.exports = db