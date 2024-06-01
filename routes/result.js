const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const Result = require('../models/result');
const Player = require('../models/players');
const fs = require('fs');

router.post('/process-result', async (req, res) => {
  try {
    const matchData = JSON.parse(fs.readFileSync('data/match.json', 'utf8'));

    const playerScores = calculatePlayerScores(matchData);
    const result = new Result({ matchId: 'CSKvRR2022', playerScores });
    await result.save();

    const teams = await Team.find().populate('players captain viceCaptain');
    for (const team of teams) {
      let teamPoints = 0;
      team.players.forEach(player => {
        const playerScore = playerScores.find(score => score.player.equals(player._id));
        if (playerScore) {
          let points = playerScore.score;
          if (player._id.equals(team.captain._id)) {
            points *= 2;
          }
          if (player._id.equals(team.viceCaptain._id)) {
            points *= 1.5;
          }
          teamPoints += points;
        }
      });
      team.points = teamPoints;
      await team.save();
    }

    res.status(200).json({ message: 'Match results processed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function calculatePlayerScores(matchData) {
  const playerScores = {};

  matchData.forEach(ball => {
    const batsman = ball.batsman;
    const bowler = ball.bowler;
    const runs = ball.runs.batsman;
    const wicket = ball.wicket;

    if (!playerScores[batsman]) playerScores[batsman] = { player: batsman, score: 0 };
    if (!playerScores[bowler]) playerScores[bowler] = { player: bowler, score: 0 };

    // Batting points
    playerScores[batsman].score += runs;
    if (runs >= 50) playerScores[batsman].score += 8;
    if (runs >= 100) playerScores[batsman].score += 16;

    // Bowling points
    if (wicket) {
      playerScores[bowler].score += 25;
      if (wicket.kind === 'bowled' || wicket.kind === 'lbw') playerScores[bowler].score += 8;
    }
  });

  return Object.values(playerScores);
}

module.exports = router;
