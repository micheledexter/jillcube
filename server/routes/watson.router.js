const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "watson";`;
    pool.query(queryText).then(response => {
      res.send(response.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/watson: ${error}`);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

router.get('/prompt/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "watson" WHERE "data_id" = $1;`;
    let id = [req.params.id];
    pool.query(queryText, id).then(response => {
      res.send(response.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/watson/prompt/:id: ${error}`);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;