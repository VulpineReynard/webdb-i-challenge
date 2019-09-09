const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

// BASE ACCOUNTS ENDPOINT //
router.route("/")
.get(function rootGetController(req, res) {
  db('accounts')
    .select('name', 'budget')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.json(err)
    })
})
.post(function rootPostController(req, res) {
  
})

module.exports = router;