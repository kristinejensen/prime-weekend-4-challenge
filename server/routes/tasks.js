var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM tasks;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  }); // end of pool.connect
}); // end of router.get

router.post('/new', function(req, res){
  var newTask = req.body;

  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO tasks (task_name, details, due_date, complete) VALUES ($1, $2, $3, $4);',
      [newTask.taskName, newTask.taskDetails, newTask.dueDate, newTask.complete],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
}); // end of router post function

router.put('/complete/:id', function(req, res){
  var taskID = req.params.id;
  var taskObject = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    }else{
      client.query('UPDATE tasks SET complete=$1 WHERE id=$2;',
      [taskObject.complete, taskID],
      function(errorMakingQuery, result) {
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        }else{
          res.sendStatus(200);
        }
      });
    }
  });
}); // end of router put function

router.delete('/delete/:id', function(req, res){
  var taskID = req.params.id;
  console.log('ID of task to delete: ', taskID);
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    }else{
      client.query('DELETE FROM tasks WHERE id=$1;',
      [taskID],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        }else{
          res.sendStatus(200)
        }
      });
    }
  });
}); // end of router.delete

module.exports = router;
