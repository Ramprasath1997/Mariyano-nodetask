// import-players.js
const fs = require('fs');
const mongoose = require('mongoose');
const Player = require('./models/players');
const db = require('./db'); // assuming you have a db.js to handle mongoose connection

const playersData = JSON.parse(fs.readFileSync('data/players.json', 'utf8'));

async function importPlayers() {
  await Player.deleteMany({});
  await Player.insertMany(playersData);
  console.log('Players imported successfully');
  mongoose.connection.close();
}

importPlayers();
