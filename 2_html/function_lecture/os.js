const os = require('os');
console.log('os.cpus():', os.cpus());

console.log('os.homedir():', os.homedir());
//홈 디렉토리의 경로
console.log('os.tmpdir():', os.tmpdir());
//임시 파일 저장 경로
console.log('os.arch():', os.arch());
// 운영체제 아키텍쳐 정보
console.log('os.platform():', os.platform());
//운영체제 플랫폼 정보
console.log('os.hostname():', os.hostname());
//컴퓨터의 이름
console.log('os.release():', os.release());
//운영체제의 버전
console.log('os.type():', os.type());
//운영체제의 종류
console.log('os.uptime():', os.uptime());
//운영체제 부팅 이후 흐른 시간
console.log('os.freemem():', os.freemem());
//사용 가능한 메모리
console.log('os.totalmem():', os.totalmem());
//전체 메모리 용량

