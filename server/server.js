var express = require('express');
const app = express();
var path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

//използва handlebars като default engine
app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.use("/", express.static(__dirname + "/../client"));

app.use("/style.css", express.static(__dirname + "/../style.css"));

//използваме bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

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

//взима информация от датабазата
function getData(res) {
    con.query("SELECT * FROM user ORDER BY score DESC", function (err, result, fields) {
        if (err) throw err;
        res.render(path.join(__dirname + '/views/layouts/main.hbs'), { data: result });
    });
}

//main page
app.get('/', function (req, res) {
    res.sendFile(path.resolve('../client/index.html'));
});

//leaderboard page
app.get('/leaderboard', function (req, res) {
    getData(res);
});

//post-ва резултати
app.post('/sendInfo', (req, res) => {
    let username = req.body.username;
    let score = req.body.score
    sendData(username, score);
    res.status(200).redirect('/leaderboard');
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