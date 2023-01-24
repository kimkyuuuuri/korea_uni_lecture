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
    connection.query(`SELECT * FROM MEMOS ORDER BY ID DESC`, (err, rows) => {
        if(err) throw err;
        console.log('err:', err);
        console.log('rows:',rows);
        callback(rows);
    });
}


function insertMemo(writer, title, content, image_path, callback){
    connection.query(`INSERT INTO MEMOS (WRITER, TITLE, CONTENT, IMAGE, CREATED_AT, UPDATED_AT) VALUES ('${writer}','${title}','${content}', '${image_path}', NOW(),NOW())`, (err, result) =>{
        if (err) throw err;
        callback();
    });
}

function getMemoById(id, callback){
    connection.query(`SELECT * FROM MEMOS WHERE ID =${id}`, (err, row) =>{
        if(err) throw err;
        callback(row);
    });
}

function updateMemoById(id, writer, title, content, image_path, callback){
    connection.query(`UPDATE MEMOS SET WRITER ='${writer}', TITLE='${title}', CONTENT='${content}', IMAGE ='${image_path}', UPDATED_AT=NOW() WHERE ID=${id}`, (err, result) => {
        if(err) throw err;
        callback();
    });
}

function deleteMemoById(id, callback){
    connection.query(`DELETE FROM MEMOS WHERE ID=${id}`, (err, result) =>{
        if(err) throw err;
        callback();
    });
}

module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById
}