/////////////////////////

var express = require('express');
var router = express.Router();

const multer = require('multer');
const path =require('path');
const fs = require('fs');
const db= require('./../db');


try {
    fs.readdirSync('uploads');
  } catch (error) {
    console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }


//multer 모듈에 옵션 주어 upload 변수에 대입
//storage 옵션 : 파일저장방식, 경로, 파일명 등

  const upload = multer({
    //서버디스크저장, uploads폴더 저장
    storage : multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            //기존확장자명과 업로드날짜값 더함으로써 파일명 중복 방지
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: {fileSize : 5 * 1024 * 1024},
  });

//upload 변수에 있는 여러 메소드중, single 사용 (하나의 이미지 업로드할 때 사용)
//이는 req.file 객체를 생성함

/* Write function */
router.post('/newMemo', upload.single('userfile'), function(req, res){
    console.log(req.body);
    let writer = req.body.writer;
    let title = req.body.title;
    let content = req.body.content;
    let image_path = '';

    //추가
    if (typeof(req.file) != 'undefined') {
        image_path += req.file.filename
    }
  
    db.insertMemo(writer, title, content, image_path, () => {
    res.redirect('/board');
    })
  })
  
  /* Update function */
  router.post('/updateMemo', upload.single('userfile'), (req, res) =>{
    let id = req.body.id;
    let writer = req.body.writer;
    let title = req.body.title;
    let content = req.body.content;
    let image_path = '';

    //추가
    if (typeof(req.file) != 'undefined') {
        image_path += req.file.filename
    }
  
    db.updateMemoById(id, writer, title, content, image_path, () =>{
      res.redirect('/board');
    });
  });

module.exports = router;