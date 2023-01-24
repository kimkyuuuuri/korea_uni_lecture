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


/* GET new write page. */
router.get('/newMemo', function(req, res){
  res.render('newMemo');
});

/* GET update page. */
router.get('/updateMemo', (req, res) => {
  let id = req.query.id;

  db.getMemoById(id, (row)=>{
    if(typeof id==='undefined' || row.length <=0){
      res.status(404).json({error:'undefined memo'});
    } else{
      console.log(row[0]);
      res.render('updateMemo',{row:row[0]});
    }
  });
});

// /* Write function */
// router.post('/newMemo', function(req, res){
//   console.log(req.body);
//   let writer = req.body.writer;
//   let title = req.body.title;
//   let content = req.body.content;
//   let image_path = '';

//   db.insertMemo(writer, title, content, image_path, () => {
//   res.redirect('/board');
//   })
// })

// /* Update function */
// router.post('/updateMemo', (req, res) =>{
//   let id = req.body.id;
//   let writer = req.body.writer;
//   let title = req.body.title;
//   let content = req.body.content;
//   let image_path = '';

//   db.updateMemoById(id, writer, title, content, image_path, () =>{
//     res.redirect('/board');
//   });
// });

/* Delete function */
router.get('/deleteMemo', (req, res)=> {
  let id = req.query.id;

  db.getMemoById(id, (row)=>{
    if(typeof id==='undefined' || row.length <=0){
      res.status(404).json({eroor:'undefined memo'});
    } else{
      db.deleteMemoById(id, () =>{
        res.redirect('/board');
      });
    }
  });
});


/////////////////////////


/* Filter function */
router.post('/combo', function(req, res){
  console.log(req.body.combo);
  console.log(req.body.search); 
  let combo = req.body.combo;
  let search = req.body.search;
  db.searchKeyword(combo, search, ((rows) =>{
  res.render('board', { rows: rows });
  }));
})



module.exports = router;
