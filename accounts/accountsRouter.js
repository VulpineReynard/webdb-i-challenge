const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

// BASE ACCOUNTS ENDPOINT //
router.route("/")
.get(function rootGetController(req, res) {

  db.select('*').from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.json(err);
    })

})
.post(function rootPostController(req, res) {
  
  // insert into accounts () values ()
  const accountsData = req.body;
  // validate the data before inserting into database
  db('accounts')
    .insert(accountsData, 'id')
    .then(([id]) => { 
      db('accounts')
        .where({ id }) // always returns an array
        .first() // picks the first element of the resulting array
        .then(account => { 
          res.status(200).json(account) 
        });
  })
  .catch(err => { 
    res.json(err) 
  })

})

// ACCOUNT BY ID ENDPOINT //
router.route("/:id")
.get(function idGetController(req, res) {

  const { id } = req.params;
  db('accounts')
    .where({ id }) // always returns an array
    .first() // picks the first element of the resulting array
    .then(account => { 
      res.status(200).json(account) 
    })
    .catch(err => { 
      res.json(err) 
    })

})
.put(function idPutController(req, res) {

  const updatedAccount = req.body;
  db('accounts')
    .where('id', req.params.id)
    .update(updatedAccount)
    .then(count => {
      res.status(200).json({ message: `Updated ${count} records.` })
    })
    .catch(err => {
      res.json(err);
    })

})
.delete(function idDeleteController(req, res) {

  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `Deleted ${count} records.` })
    })
    .catch(err => {
      res.json(err)
    })

})

module.exports = router;