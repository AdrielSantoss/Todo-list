const config = require('../knexfile'),
    knex = require('knex')(config);

knex.migrate.latest([config]);
module.exports = knex;
