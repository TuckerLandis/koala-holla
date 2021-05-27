const { Router } = require('express');
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
koalaRouter.put('/:id', (req, res) => {
    let koalaId = req.params.id;//setting Koala id dynamically
    let transferReady = req.body.ready_to_transfer//sets variable to transferability of koala
    console.log(transferReady);
    let queryString = '';
    
    if (transferReady === 'N'){//SQL statement to update transfer status of Koalas
        queryString = `UPDATE "koalas" SET "ready_to_transfer" = 'Y' WHERE "koalas".id = $1;`;
    } else {
        res.sendStatus(500);
        return;
    }
    pool.query(queryString, [koalaId])
        .then(response => {
            console.log(response.rowCount);
            res.sendStatus(202);//sends info to SQL DB for update and sends back 202
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);//if it doesn't work get 500
        });
})

// DELETE

module.exports = koalaRouter;