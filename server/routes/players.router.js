const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

// Get all players in database
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
router.get('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "players" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then(results => {
      res.send(results.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/players/:id: ${error}`);
    });
  } else {
    res.sendStatus(403);
  }
});

// Get player-list from game instance
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
router.post('/:gameId', (req, res) => {
  if (req.isAuthenticated()) {
    const newPlayer = req.body;
    const gameInstance = req.params.gameId;
    let queryText = '';
    if (newPlayer.userId) {
      queryText = `INSERT INTO "players" ("instance_id", "user_id", "name", "player_number") VALUES ($1, $2, $3, $4);`;
      let queryBody = [
        gameInstance,
        newPlayer.userId,
        newPlayer.name,
        newPlayer.playerNumber
      ];
      pool.query(queryText, queryBody).then(() => {
        res.sendStatus(201);
      }).catch(error => {
        console.error(`ERROR trying to post /api/players/:gameId: ${error}`);
        res.sendStatus(500);
      });
    } else {
      queryText = `INSERT INTO "players" ("instance_id", "name", "player_number") VALUES ($1, $2, $3);`;
      let queryBody = [
        gameInstance,
        newPlayer.name,
        newPlayer.playerNumber
      ];
      pool.query(queryText, queryBody).then(() =>{
        res.sendStatus(201);
      }).catch(error => {
        console.error(`ERROR trying to post /api/players/:gameId: ${error}`);
        res.sendStatus(500);
      });
    }
  }
});

module.exports = router;