var express = require("express");
var app = express();
var bodyParser = require('body-parser'); // Create application/x-www-form-urlencoded parser (for POST)
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
var url = require('url');

var mysql = require('mysql');
var util = require('util'); // for async calls
//var utilPromisify = require('util.promisify').shim(); // ?? for connection pools

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var insertedId; // global variable for SQL-updates

const conn = mysql.createConnection({
    host: "localhost",
    user: "dog",
    password: "koira",
    database: "example_db"
});
// node native promisify
const query = util.promisify(conn.query).bind(conn); // is bind needed?

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

app.post("/api/event", urlencodedParser, function (req, res) {

    //console.log("Request body: " + req.body);
    //console.log("Request body length: " + req.body.getLength);
    console.log("body: %j", req.body);
    // get JSON-object from the http-body
    var jsonObj = req.body;
    console.log("Arvo: "+jsonObj.eventName);
    
    // make updates to the database
    if (jsonObj.eventLocation>-1) { // is  a location place already present?
        var sql = "INSERT INTO event (Name, Type, Location_Location_id)"
            + " VALUES ( ?, ?, ?)";
        (async () => {  // IIFE (Immediately Invoked Function Expression)
            try {
                const result = await query(sql, [jsonObj.eventName, jsonObj.eventType, jsonObj.eventLocation]);
                let insertedId = result.insertId;
                sql = "INSERT INTO Event_date (Date, Event_id)"
                    + " VALUES ( ?, ?)";
                await query(sql, [jsonObj.eventDate, insertedId]);
                res.status(200).send("POST succesful " + req.body);
            } catch (err) {
                console.log("Insertion into some (2) table was unsuccessful!" + err);
                res.status(400).send("POST was not succesful " + err);
            }

        })()
    }
});

app.post("/api/user", urlencodedParser, function (req, res) {

    //console.log("Request body: " + req.body);
    //console.log("Request body length: " + req.body.getLength);
    console.log("body: %j", req.body);
    // get JSON-object from the http-body
    var jsonObj = req.body;
    console.log("Arvo: "+jsonObj.email);
    
    // make updates to the database
    
        var sql = "INSERT INTO user (email, password)"
            + " VALUES ( ?, ?)";
        (async () => {  // IIFE (Immediately Invoked Function Expression)
            try {
                
                bcrypt.hash(jsonObj.password, 10, async function(err, hash) {
                    // Store hash in your password DB.
                    await query(sql, [jsonObj.email, hash]);
                });
                res.status(200).send("POST succesful " + req.body);
            } catch (err) {
                console.log("Insertion into some (2) table was unsuccessful!" + err);
                res.status(400).send("POST was not succesful " + err);
            }

        })()
    
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
