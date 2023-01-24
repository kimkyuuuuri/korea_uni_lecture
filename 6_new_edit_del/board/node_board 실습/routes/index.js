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


router.get('/newMemo', function(req, res){
  res.render('newMemo');
});


router.post('/newMemo', function(req, res){
  console.log(req.body);
  let writer=req.body.writer;
  let title=req.body.title;
  let content=req.body.content;
  let image_path='';
  db.insertMemo(writer,title,content,image_path, () => {
    res.redirect('/board');
  })
  
})



router.get('/updateMemo', (req, res) => {
  let id=req.query.id;

  db.getMemoById(id, (row)=>{
    if(typeof id==='undefined' || row.length<=0){
      res.status(404).json({error:'undefined memo'});
    } else{
      console.log(row[0]);
      res.render('updateMemo',{row:row[0]});
    }
  });
});



router.post('/updateMemo', (req, res) =>{
  let id = req.body.id;
  let writer=req.body.writer;
  let title=req.body.title;
  let content=req.body.content;
  let image_path='';
  db.updateMemoById(id,writer,title,content,image_path, () => {
    res.redirect('/board');
  })
  
});


router.get('/deleteMemo', (req, res)=> {
  let id=req.query.id;

  db.deleteMemoById(id, (row)=>{
    if(typeof id==='undefined' || row.length<=0){
      res.status(404).json({error:'undefined memo'});
    } else{
      console.log(row[0]);
      res.redirect('/board');
    }
  });
  
});


module.exports = router;
