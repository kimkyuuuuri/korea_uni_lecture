//http 모듈 사용 (http 서버 만들기)
const http = require('http');

//코드를 수정하면 서버를 껐다 켜야 함!

// 데이터 저장용
const users = {}; 

// 서버를 만듬
// 함수 실행 (클라이언트로부터 오는 요청 = req, 서버가 보내줄 응답 = res)
http.createServer((req, res) => {
  try {
    //GET 메소드
    if (req.method === 'GET') {
      //url : /
      if (req.url === '/') {
        return res.end(JSON.stringify({
          message : "hello!",
        }));
      //url : about
      } else if (req.url === '/about') {
        return res.end(JSON.stringify({
          message : "hi about!",
        }));
      //url이 user이면
      } else if (req.url === '/user') {
        return res.end(JSON.stringify(users));
      } 
    //POST 메소드
    } else if (req.method === 'POST') {
      //url : addUser
      if (req.url === '/addUser') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.end(JSON.stringify(users));
        });
      }
    //PUT 메소드
    } else if (req.method === 'PUT') {
      // url : mUser
      if (req.url === '/mUser') {
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
        const { key } = JSON.parse(body);
        const { name } = JSON.parse(body);
        users[key] = name;
        res.end(JSON.stringify(users));
        })
      }
    //DELETE 메소드
    } else if (req.method === 'DELETE') {
      // url : delUser
      if (req.url === '/delUser') {
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
        const { key } = JSON.parse(body);
        delete users[key];
        res.end(JSON.stringify(users));
        })
      }
    }
    // else
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.end(err.message);
  }
})

// 서버를 프로세스로 올려야 함
// 8082 포트에 서버를 올릴 것임
// 서버를 실행하는 경우 (listen)에는 터미널 한 개를 차지 (ctrl + c로 취소)
// 포트는 서버 내에서 프로세스를 구분하는 번호 (https는 443, http서버는 80포트)
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
