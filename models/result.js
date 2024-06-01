const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  playerScores: [{
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    score: { type: Number, required: true },
  }],
});

module.exports = mongoose.model('Result', resultSchema);
