const url = require('url');

// node방식
const parseUrl = url.parse('https://search.naver.com/search.naver?query=고려대학교');
console.log('parseUrl:', parseUrl);
console.log('format:', url.format(parseUrl));

// WHATWG방식
const {URL} = url;
const myURL = new URL('https://search.naver.com/search.naver?query=고려대학교');
console.log('myURL:', myURL);
console.log('format myURL:', url.format(myURL));  // node 방식과 다르게 username, password,origin,searchParam


console.log('searchParams:',myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
