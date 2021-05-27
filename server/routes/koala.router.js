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
koalaRouter.delete('/:id', (req, res) => {
    const itemToDelete = req.params.id;
    const queryText = `DELETE FROM "koalas" WHERE "koalas".id = $1`;
    pool.query(queryText, [itemToDelete])
    .then((response) => {
        console.log(`we deleted the koala with id ${itemToDelete}`);
        res.send(200);
    }).catch((err) => {
        console.log('something went wrong in koalaRouter.delete', err);
        res.sendStatus(500)
    });
});//end koalaRouter.delete

module.exports = koalaRouter;