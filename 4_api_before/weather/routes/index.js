const express = require('express');
const router = express.Router();
const request = require('request');

//현재 시각 가져오는 모듈
const moment = require('moment');
//장소
// require('moment-timezone');

router.get('/weather', function(req, res, next) {
  const url1 = '';

  const key = "";
  
  // moment.tz.setDefault("Asia/Seoul");
  const date = "";
  const base_time =""; 
  const nx = 60;
  const ny = 127;

  const dataType = 'JSON';


  // url
  const all_url = url1 + '?serviceKey=' + key +  '&numOfRows=' + 20 +  '&pageNo=' + 1 + '&dataType=' + dataType + '&base_date=' + date + '&base_time=' + base_time + '&nx=' + nx + '&ny=' + ny;
  console.log(all_url);

  //request(url, 콜백함수)
  request(all_url, function(error, response, body){
    if(error){
      console.log(error)
    }
    var obj = JSON.parse(body)
    console.log(body);
    console.log("obj:", obj)
    console.log("obj.response.body.items:", obj.response.body.items)
    var w_data = obj.response.body.items;

    
    var today_rain = w_data.item[0].obsrValue;
    var today_tem = w_data.item[3].obsrValue;
    console.log("today_rain",today_rain);
    console.log("today_tem",today_tem);

    res.render('index', {title: 'weather', rain : today_rain, tem : today_tem, time: base_time});
   
  })


});

module.exports = router;

