const mongoose = require('mongoose');

const connectDB = mongoose
  .connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('\n\nConnected with MongoDB'))
  .catch(err => console.error('Error on db connection: ', err));


module.exports = connectDB;
  