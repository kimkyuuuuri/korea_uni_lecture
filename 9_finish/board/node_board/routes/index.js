var express = require('express');
var router = express.Router();

var crypto = require('crypto');

//////////////////////
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./../module/json-response");

const db = require('./../db');


/* GET first page. */
router.get('/', function(req, res){
  res.render('firstPage');
});


/* GET board page. */
/////////////////////////
router.get('/board', verifyToken, function(req, res) {
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


/* GET login page. */
router.get('/login', function(req, res){
  res.render('login');
});


/* Login function */
router.post("/login", function(req, res){
  let id = req.body.id;
  let password = req.body.password;

  console.log(id, password, process.env.JWT_SECRET);

      db.memberLogin(id, (rows) => {
      console.log('rows :', rows);

      if(rows.length == 0){
        res.json({'status':false, 'message':'????????? ?????? ??????????????? ???????????????.'});
      }else{
        

          let pass = rows[0].M_PASSWORD;  // DB ????????? ??????
          let salt = rows[0].M_PASSWORD_KEY;  // DB ????????? ??????
          let hashpasswd = crypto.createHash("sha512").update(password+salt).digest("hex"); // ????????? ???????????? + DB ?????????

          if(pass === hashpasswd){
            
              //////////////////////////
              let token = jwt.sign({ "username" : rows[0].M_NAME }, process.env.JWT_SECRET, { expiresIn: '60m'});
              let decoded = jwt.verify(token, process.env.JWT_SECRET);
              let token_username = decoded.username;

              res.json({ 'status': true, 'message': '??????', token: token, 'username': token_username});

          }else{
              res.json({'status':false, 'message':'??????????????? ???????????????.'});
          }
      }
    })
})

/* Get registration page. */
router.get('/regis', function(req, res) {
  res.render('regis');
});


/* Registration function */
router.post('/regis', function(req, res){

  let id = req.body.id;
  let password = req.body.password;
  let name = req.body.name;

  if (id.length < 4){
    res.json({'status': false, 'message':'???????????? 4?????? ???????????? ??????????????????'});
  } else if (password.length < 4){
    res.json({'status': false, 'message':'??????????????? 4?????? ???????????? ??????????????????'});
  } else if (name.length == 0){
    res.json({'status': false, 'message':'????????? ??????????????????'});
  } else {

  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  //createHash : ????????? ?????? ???????????? ?????????. ????????? sha512????????? ??????????????? ?????? ???????????? ??? ?????? (sha256, sha512, md5)
  //update : ????????? ????????? ????????? (?????? ?????? ?????????????????? ????????? ??????)
  //digest : ???????????? ???????????? ?????????. (base64, hex, latin1)
  let hashpasswd = crypto.createHash("sha512").update(password+salt).digest("hex");
  console.log('salt:', salt);
  console.log('hashpasswd:', hashpasswd);

  db.memberLogin(id, (rows) => {
    console.log('rows :', rows);
  
    if(rows.length == 0){
      db.regisMember(id, hashpasswd, salt, name, ()=>{
        res.json({'status': true, 'message': '??????'});
      })
    }else{
        res.json({'status': false, 'message':'???????????? ?????? ?????????.'});
      }
    }
  )
  }
})



module.exports = router;
