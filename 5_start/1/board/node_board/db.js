const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'korea_uni',
    password:'rbflrbflrbfl',
    port:3306,
    database:'korea_uni',
    dateStrings: 'date'
});

function getAllMemos(callback){
    connection.query(`SELECT * FROM MEMOS WHERE TITLE='hi`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

module.exports = {
    getAllMemos
}