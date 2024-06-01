const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const Player = require('../models/players');
const { body, validationResult } = require('express-validator');

const validateTeamEntry = [
  body('teamName').not().isEmpty().withMessage('Team Name is required'),
  body('players').isArray({ min: 11, max: 11 }).withMessage('Team must have 11 players'),
  body('captain').not().isEmpty().withMessage('Captain is required'),
  body('viceCaptain').not().isEmpty().withMessage('Vice-Captain is required'),
];

router.post('/add-team', validateTeamEntry, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { teamName, players, captain, viceCaptain } = req.body;

  try {
    const playerDocs = await Player.find({ name: { $in: players } });
    const captainDoc = await Player.findOne({ name: captain });
    const viceCaptainDoc = await Player.findOne({ name: viceCaptain });

    if (playerDocs.length !== 11 || !captainDoc || !viceCaptainDoc) {
      return res.status(400).json({ message: 'Invalid player selection' });
    }

    const newTeam = new Team({
      teamName,
      players: playerDocs.map(player => player._id),
      captain: captainDoc._id,
      viceCaptain: viceCaptainDoc._id,
    });

    await newTeam.save();
    res.status(201).json({ message: 'Team added successfully', team: newTeam });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
