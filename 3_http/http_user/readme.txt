http 모듈로 (express 사용X) API 실습 예제 만들기

GET 조회
localhost:8082/ : { message : "hello!" }
localhost:8082/about : { message : "hi about!" }
localhost:8082/user : user목록 JSON

POST 삽입
{ "name" : "?" } 으로 전달 받음.
localhost:8082/addUser : user목록 JSON

PUT 수정
{ "key" : "?", "name" : "?" } 으로 전달 받음.
localhost:8082/mUser : user목록 JSON

DELETE 삭제
{ "key" : "?"} 으로 전달 받음.
localhost:8082/delUser : user목록 JSON 