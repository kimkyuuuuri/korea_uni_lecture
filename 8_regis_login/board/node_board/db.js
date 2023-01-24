const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wedatalab',
    port: 3308,
    database: 'board',
    dataStrings: 'date' 
});

function getAllMemos(callback){
    connection.query(`SELECT * FROM MEMOS ORDER BY ID DESC`, (err, rows) => {
        if(err) throw err;
        // console.log('err:', err);
        // console.log('rows:',rows);
        callback(rows);
    });
}


function insertMemo(writer, title, content, image_path, callback){
    connection.query(`INSERT INTO MEMOS (WRITER, TITLE, CONTENT, IMAGE, CREATED_AT, UPDATED_AT) VALUES ('${writer}','${title}','${content}', '${image_path}', NOW(),NOW())`, (err, result) =>{
        if (err) throw err;
        // console.log(result);
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

function searchKeyword(combo, search, callback){
    connection.query(`SELECT * FROM MEMOS WHERE ${combo} LIKE '%${search}%'`, (err, rows, fields) =>{
        if(err) throw err;
        callback(rows);
    });
}

///////////////////////

function memberLogin(id, callback){
    connection.query(`SELECT M_ID, M_PASSWORD, M_PASSWORD_KEY, M_NAME, M_CREATED_AT FROM MEMBER_INFO WHERE M_ID = '${id}'`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

function regisMember(id, hashpasswd, salt, name, callback){
    connection.query(`INSERT INTO MEMBER_INFO (M_ID, M_PASSWORD, M_PASSWORD_KEY, M_NAME, M_CREATED_AT) VALUES ('${id}','${hashpasswd}', '${salt}', '${name}', NOW())`, (err, result) =>{
        if (err) throw err;
        callback();
    });
}

module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById,
    searchKeyword,
    memberLogin,
    regisMember
}

