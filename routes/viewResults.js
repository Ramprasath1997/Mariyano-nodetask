const express = require('express');
const router = express.Router();
const Team = require('../models/team');

router.get('/team-result', async (req, res) => {
  try {
    const teams = await Team.find().sort({ points: -1 });
    const topScore = teams[0]?.points || 0;
    const winningTeams = teams.filter(team => team.points === topScore);
    
    res.status(200).json(winningTeams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
