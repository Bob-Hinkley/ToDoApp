var express = require("express");
var router = express.Router();
var pg = require("pg");
var config = { database: "todo" };
var pool = new pg.Pool(config);

router.post('/', function(req, res) {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      client.query(
        "INSERT INTO task (message, complete) VALUES ($1, $2) RETURNING *;",
        [req.body.message, false], function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            // console.log("Got info from DB", result.rows);
            res.send(result.rows);
          }
        }
      );
    }
  });
});

router.put('/', function(req, res) {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      client.query("UPDATE task SET complete=true where id=" + req.body.id, function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            // console.log("Got info from DB", result.rows);
            res.send(result.rows);
          }
        }
      );
    }
  });
});

router.get('/', function(req, res) {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      client.query(
        "SELECT * FROM task", function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            // console.log("Got info from DB", result.rows);
            res.send(result.rows);
          }
        }
      );
    }
  });
});

router.delete('/:id', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
      console.log("Error connecting to DB: ", err);
      res.sendStatus(500);
      done();
    } else {
      client.query('DELETE FROM task WHERE id = $1', [req.params.id], function(err, result){
        if (err) {
          done();
          console.log("Error deleting from DB: ", err);
          res.sendStatus(500);
        } else {
          console.log('Deleting from DB');
          res.sendStatus(204);
        }
      })
    }
  })
})



module.exports = router;
