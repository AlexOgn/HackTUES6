var express = require('express');
const app = express();
var path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
/*const ejs = require('ejs');
app.set('view engine', 'ejs');*/

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.use("/",express.static(__dirname + "/"));

app.set('view engine', 'hbs');

//пише в датабазата
function sendData(username, score) {
    if (score == "") {
        score = 0;
    }
    var sql = `INSERT INTO user (username, score) VALUES ("${username}", "${score}")`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

function getData(res) {
    con.query("SELECT * FROM user ORDER BY score DESC", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render(path.join(__dirname + '/views/layouts/main.hbs'), { data: result });
    });
}
app.get('/', function (req, res) {
    getData(res);
});

/*
    if (err) throw err;
    con.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
*/

//използваме bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

/*
app.get('/leaders', function(req, res){
    const data = getData();
    res.json(data);
})
*/

//post-ва резултати
app.post('/leaderboard', (req, res) => {
    let username = req.body.username;
    let score = req.body.score
    sendData(username, score);
    res.status(200).redirect('/');
});


//SQL магии
con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hacktues',
    password: 'рикосхет123321'
});

//свързване с датабазата
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

app.listen(8080);