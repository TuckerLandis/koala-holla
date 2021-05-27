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


// POST

koalaRouter.post('/', (req, res) => {
    console.log(req.body);

  let queryText = `INSERT INTO "koalas" 
	("name", "gender", "age", "ready_to_transfer", "notes") 
    VALUES 
        ($1, $2, $3, $4, $5)`
 
 pool.query(queryText, [req.body.name, req.body.gender, req.body.age, req.body.readyForTransfer, req.body.notes] )
 .then ((result) => {
     res.sendStatus(201);
     
 }).catch(err => {
     console.log(err);
     
     res.sendStatus(500);
 })
 });

// PUT


// DELETE

module.exports = koalaRouter;