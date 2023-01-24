var fs = require('fs');

fs.readFile('notexist.txt', 'utf8', function(err, data) { //존재하지 않는 파일 읽기
    if (err) {
        console.log(err); // 읽기 실패
    }
    else {
        console.log(data); // 읽기 성공
    }
});

console.log('hi');
