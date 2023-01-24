const url = require('url');
const myURL = new URL('https://naver.com/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);

console.log('searchParams.keys():', myURL.searchParams.keys());
console.log('searchParams.values():', myURL.searchParams.values());

console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
console.log('searchParams.get():', myURL.searchParams.get('limit'));
console.log('searchParams.has():', myURL.searchParams.has('page'));


