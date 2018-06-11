const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/* GET routes */
// GET /api/answers
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "prompt_answers";`;
    pool.query(queryText).then(response => {
      res.send(response.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/answers`);
      res.sendStatus(500);
    });
  }
});

// GET /api/answers/id/:id
router.get('/player_id/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "prompt_answers" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then(response => {
      res.send(response.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/answers/id/:id: ${error}`);
      res.sendStatus(500);
    });
  }
});

// GET /api/answers/player_id/:id
router.get('/player_id/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "prompt_answers" WHERE "player_id" = $1;`;
    pool.query(queryText, [req.params.id]).then(response => {
      res.send(response.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/answers/player_id/:id: ${error}`);
      res.sendStatus(500);
    });
  }
});

// GET /api/answers/instance_id/:id
router.get('/instance_id/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "prompt_answers" WHER "instance_id" = $1;`;
    pool.query(queryText, [req.params.id]).then(response => {
      res.send(response.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/answers/instance_id/:id: ${error}`);
      res.sendStatus(500);
    });
  }
});

/* POST routes */
// POST /api/answers
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `INSERT INTO "prompt_answers" ("player_id", "instance_id", "data_id", "answer") VALUES ($1, $2, $3, $4);`;
    let queryBody = [req.body.player_id, req.body.instance_id, req.body.data_id, req.body.answer];
    pool.query(queryText, queryBody).then(() => {
      res.sendStatus(201);
    }).catch(error => {
      console.error(`ERROR trying to POST /api/answers: ${error}`);
      res.sendStatus(500);
    });
  }
});

module.exports = router;