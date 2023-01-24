const fs = require('fs');

fs.readFile('text.txt', 'utf8', function(err, data) {
    console.log('비동기적 읽기: ' + data);
});

const text = fs.readFileSync('text.txt', 'utf8');
console.log('동기적 읽기: ' + text);