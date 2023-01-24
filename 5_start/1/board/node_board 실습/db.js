const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'',
    password:'',
    port:3306,
    database:'',
    dateStrings: 'date'
});

function getAllMemos(callback){
    connection.query(`SELECT * FROM MEMOS ORDER BY ID DESC`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

function getAllMemos2(callback){
    connection.query(`SELECT * FROM MEMOS WHERE TITLE='hi' `, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

module.exports={
    getAllMemos,
    getAllMemos2
}