/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// David Hoxie
// dahoxie@gmail.com
// 4/20/16
// Assignment 7
var express = require("express"),
    http = require("http"),
    bodyParser = require("body-parser"),
    app = express(),
    MongoClient = require("mongodb").MongoClient,
    mondb;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

http.createServer(app).listen(3000);

var url = "mongodb://localhost:27017/assignment7";

MongoClient.connect(url, function(err, db) {
    "use strict";
    console.log("Mongo Connection Error: " + err);
    mondb = db;

});

//closes connection to mongodb when
//SIGINT is sent to process
process.on("SIGINT", function() {
    "use strict";
    mondb.close();
    process.exit();
});

//adds a new link to the mongodb
app.post("/links", function(req, res) {
    "use strict";
    var collection = mondb.collection("links");
    collection.insertOne({
        title: req.body.title,
        link: req.body.link,
        clicks: 0
    }, function(err, result) {
        console.log("Mongo Insertion Error: " + err);
    });
});

//returns a list of links in the mongodb
app.get("/links", function(req, res) {
    "use strict";
    var collection = mondb.collection("links");
    collection.find({}, function(err, result) {
        console.log("Mongo find Error: " + err);
        result.toArray(function(err, linksArray) {
            res.json({
                "result": JSON.stringify(linksArray),
            });
        });

    });
});

//updates number of clicks are redirects to
//given link
app.get("/click/:title", function(req, res) {
    "use strict";
    var collection = mondb.collection("links"),
        linkClicks = 0;
    console.log(req);
    collection.find({
        title: req.params.title
    }, function(err, result) {
        console.log("Mongo find Error: " + err);
        result.toArray(function(err, linksArray) {
            res.redirect(linksArray[0][2]);
            linkClicks = linksArray[0][3] + 1;
            collection.updateOne({
                title: req.params.title
            }, {
                $set: {
                    clicks: linkClicks
                }
            }, function(err, result) {
                console.log("Mongo update Error: " + err);
            });
        });

    });
});
