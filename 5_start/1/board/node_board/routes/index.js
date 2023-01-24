var express = require('express');
var router = express.Router();

const db = require('./../db');

/* GET first page. */
router.get('/', function(req, res){
  res.render('firstPage');
});

/* GET board page. */
router.get('/board', function(req, res) {
  db.getAllMemos((rows) => {
    res.render('board', {rows: rows});
  })
});

module.exports = router;
