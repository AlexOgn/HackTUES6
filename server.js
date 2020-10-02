var express = require('express');
var app = express();
var path = require('path');
const mysql = require('mysql');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hacktues',
    password: 'рикосхет123321'
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO user (username, score) VALUES ('pesho', '68')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});



app.listen(8080);
