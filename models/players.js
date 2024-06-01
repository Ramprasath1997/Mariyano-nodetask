const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['WK', 'BAT', 'AR', 'BWL'] },
  team: { type: String, enum: ['RR', 'CSK'] },
});

module.exports = mongoose.model('Player', playerSchema);
