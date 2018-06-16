const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET routes
// GET /api/data
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "game_data";`;
  pool.query(queryText).then(response => {
    res.send(response.rows);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/data: ${error}`);
    res.sendStatus(500);
  });
});

// GET /api/data/total
router.get('/total', (req, res) => {
  let queryText = `SELECT COUNT(*) FROM "game_data";`;
  pool.query(queryText).then(response => {
    res.send(response.rows);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/data/count: ${error}`);
    res.sendStatus(500);
  });
});

// GET /api/data/id/:id
router.get ('/id/:id', (req, res) => {
  let queryText = `SELECT * FROM "game_data" WHERE "id" = $1;`;
  let id = req.params.id;
  pool.query(queryText, [id]).then(response => {
    res.send(response.rows);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/data/:id: ${error}`);
    res.sendStatus(500);
  });
});

// GET /api/data/list
router.get('/list', (req, res) => {
  let queryText = `SELECT "id" FROM "game_data";`;
  pool.query(queryText).then(response => {
    res.send(response.rows);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/data/list: ${error}`);
    res.sendStatus(500);
  });
});

// POST routes
// POST /api/data
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `INSERT INTO "game_data" ("prompt", "game_id", "answer") VALUES ($1, $2, $3);`;
    let queryBody = [req.body.prompt, '2', req.body.answer];
    pool.query(queryText, queryBody).then(response => {
      res.sendStatus(201);
    }).catch(error => {
      console.error(`ERROR trying to POST /api/data: ${error}`);
      res.sendStatus(500);
    });
  }
});

// PUT routes
// PUT /api/data/prompt/:id
router.put('/prompt/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `UPDATE "game_data" SET "prompt" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [req.body.prompt, req.params.id]).then(response => {
      res.sendStatus(200);
    }).catch(error => {
      console.error(`ERROR trying to PUT /api/data/prompt/:id: ${error}`);
      res.sendStatus(500);
    });
  }
});

// PUT /api/data/game_id/:id
router.put('/game_id/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `UPDATE "game_data" SET "game_id" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [req.body.game_data, req.params.id]).then(response => {
      res.sendStatus(200);
    }).catch(error => {
      console.error(`ERROR trying to PUT /api/data/game_id/:id: ${error}`);
      res.sendStatus(500);
    });
  }
});

// PUT /api/data/answer/:id
router.put('/answer/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `UPDATE "game_data" SET "answer" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [req.body.answer, req.params.id]).then(response => {
      res.sendStatus(200);
    }).catch(error => {
      console.error(`ERROR trying to PUT /api/data/answer/:id: ${error}`);
      res.sendStatus(500);
    });
  }
});

// DELETE routes
// DELETE /api/data/:id
router.delete('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `DELETE FROM "game_data" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then(response => {
      res.sendStatus(200);
    }).catch(error => {
      console.error(`ERROR trying to DELETE from /api/data/:id: ${error}`);
      res.sendStatus(500);
    });
  }
});

module.exports = router;