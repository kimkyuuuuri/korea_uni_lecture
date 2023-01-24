var express = require('express');
var router = express.Router();

const db = require('./../db');

/* GET first page. */

/* GET board page. */
router.get('/board', function(req, res) {
  db.getAllMemos((rows) => {
    res.render('board', {rows: rows});
  })
});

module.exports = router;
