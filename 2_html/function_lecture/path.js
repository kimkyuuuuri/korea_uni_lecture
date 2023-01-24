const path = require('path');
const filename=__filename;
//파일 경로
const dirname=__dirname;
//폴더 경로
console.log('filename:', filename);
console.log('dirname:', dirname);

console.log('path.sep: ',path.sep);
//경로의 구분자
console.log('path.dirname: ',path.dirname(filename));
//파일이 위치한 폴더 경로를 보여줌
console.log('path.extname: ',path.extname(filename));
//파일의 확장자를 보여줌
console.log('path.basename: ',path.basename(filename, path.extname(filename)));
//파일의 이름 보여줌
console.log('path.parse: ',path.parse(filename));
//파일 경로는 root, dir, base, ext, name으로 분리
console.log('path.format: ',path.format({
    dir: '/Users/kimkyuri/Documents/wedatalap/node.js_study',
    name:'path',
    ext: '.js'
}));
//path.parse()한 객체를 파일 경로로 합침


//자주 사용할 함수

console.log(path.normalize('Users//kimkyuri//////Documents///wedatalap/node.js_study'));
// / 를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환해준다.


console.log(path.join('/foo/bar','/tmp/file/'));
//인자로 받은 경로들을 하나의 문자열 형태로 리턴한다.
console.log(path.resolve('/foo/bar','/tmp/file/'));
//resolve도 join과 마찬가지로 인자로 받은 경로들을 문자열 형태로 리턴한다.


console.log(path.join('/foo/bar','./baz'));
console.log(path.resolve('/foo/bar','./baz'));
//동일한 결과 (/로 시작하지 않기 때문에)


console.log(path.join(__dirname, 'os.js'));