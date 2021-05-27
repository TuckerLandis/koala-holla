const express = require('express');
const koalaRouter = express.Router();
// DB CONNECTION
const pg = require('pg');
//pg configuration
const Pool = pg.Pool;
const pool = new Pool({
    database: 'koala_holla', // THIS CHANGES BY PROJECT
    host: 'localhost',
    port: 5432,
})
pool.on('connect', () => {
    console.log('CONNECTED TO POSTGRES');
});
pool.on('error', (error) => {
    console.log(error);
});



// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas" ORDER BY "name";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting koalas in router.get', error);
        res.sendStatus(500);
    });
});//end router.get

// POST


// PUT


// DELETE

module.exports = koalaRouter;