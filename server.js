const express = require('express');

const db = require('./data/dbConfig.js');
const accountsRouter = require('./accounts/accountsRouter');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with Knex</h3>');
});

function logger(req, res, next) {
  const now = new Date();
  console.log('--------------------');
  console.log(`request path: ${req.path}`);
  console.log(`type of request: ${req.method}`);
  console.log('requested @ ', now);
  next();
};

module.exports = server;