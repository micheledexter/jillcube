const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

// Get all players in database
// GET /api/players
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "players";`;
    pool.query(queryText).then(results => {
      res.send(results.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/players: ${error}`);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

// Get player by ID
// GET /api/players/id/:id
router.get('/id/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "players" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then(results => {
      res.send(results.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/players/id/:id: ${error}`);
    });
  } else {
    res.sendStatus(403);
  }
});

// Get player-list from game instance
// GET /api/players/instance/:id
router.get('/instance/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "players" WHERE "instance_id" = $1;`;
    pool.query(queryText, [req.params.id]).then(results => {
      res.send(results.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/players/instance/:id: ${error}`);
    });
  } else {
    res.sendStatus(403);
  }
});

// Get all player records belonging to a registered user
// GET /api/players/user/:id
router.get('/user/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "players" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.params.id]).then(results => {
      res.send(results.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/players/user/:id: ${error}`);
    });
  } else {
    res.sendStatus(403);
  }
});


/**
 * POST route template
 */

// Post a new player to the database based on the game instance id
// POST /api/players/:gameInstance
router.post('/:gameInstance', (req, res) => {
  const gameInstance = req.params.gameInstance;
  const newPlayer = req.body;
  if (req.isAuthenticated()) {
    let queryText = `INSERT INTO "players" ("instance_id", "user_id", "name", "player_number") VALUES ($1, $2, $3, $4);`;
    let queryBody = [
      gameInstance,
      newPlayer.userId,
      newPlayer.name,
      newPlayer.playerNumber
    ];
    pool.query(queryText, queryBody).then(response => {
      res.sendStatus(201);
    }).catch(error => {
      console.error(`ERROR trying to POST /api/players/:gameInstance: ${error}`);
      res.sendStatus(500);
    });
  } else {
    let queryText = `INSERT INTO "players" ("instance_id", "name", "player_number") VALUES ($1, $2, $3);`;
    let queryBody = [
      gameInstance,
      newPlayer.name,
      newPlayer.playerNumber
    ];
  }
});

module.exports = router;