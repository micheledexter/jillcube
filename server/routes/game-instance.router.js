const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

// Get a list of all games
// GET /api/game-instance
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "game_instance";`;
    pool.query(queryText).then(response => {
      res.send(response.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/game-instance: ${error}`);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

// GET /api/game-instance/id/:id
router.get('/id/:id', (req, res) => {
  let queryText = `SELECT * FROM "game_instance" WHERE "id" = $1;`;
  pool.query(queryText, req.params.id).then(response => {
    res.send(response.rows);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/game-instance/id/:id: ${error}`);
    res.sendStatus(500);
  });
});

// GET /api/game-instance/code/:code
router.get('/code/:code', (req, res) => {
  let queryText = `SELECT * FROM "game_instance" WHERE "code" = $1;`;
  pool.query(queryText, req.params.code).then(response => {
    res.send(response.rows);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/game-instance/code/:code: ${error}`);
    res.sendStatus(500);
  });
});

/**
 * POST route template
 */

// Create a new game instance (start a game)
// POST /api/game-instance
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    const game = req.body;
    let queryText = `INSERT INTO "game_instance" ("start_time", "status", "game_id") VALUES ($1, $2, $3);`;
    let queryBody = [
      Date(),
      'pending',
      game.gameId
    ];
    pool.query(queryText, queryBody).then(() => {
      res.sendStatus(201);
    }).catch(error => {
      console.error(`ERROR trying to POST /api/game-instance: ${error}`);
      res.sendStatus(500);
    });
  }
});

/**
 * PUT routes
 */

// Update the status of a game
// PUT /api/game-instance/status/:id
router.put('/status/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const status = req.body.status;
    let queryText = `UPDATE "game_instance" SET "status" = $1 WHERE "id" = $2;`;
    let queryBody = [
      status,
      id
    ];
    pool.query(queryText, queryBody).then(response => {
      res.sendStatus(202);
    })
  }
})

module.exports = router;