// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Ramprasath97:Ramprasath97@cricketcluster.xdoxf3w.mongodb.net/?retryWrites=true&w=majority&appName=cricketcluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
