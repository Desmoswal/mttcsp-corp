const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

exports.connect = function() {


mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
  console.log('Connected to database');
}).catch((err) =>{
  console.log(err)
  console.log('Connection failed to database')
  })
}
