const crypto=require('crypto');


//const a = crypto.createHash('알고리즘').update('변환할 문자열').digest('인코딩');

console.log('base64', crypto.createHash('sha512').update('wedatalab').digest('base64'));
console.log('base64:',crypto.createHash('sha512').update('wedatalap').digest('base64'));


