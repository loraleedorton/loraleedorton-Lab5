var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.post('/comment', function(req, res, next) {
    console.log("POST comment route");
    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log("Save worked: ", post);
        res.sendStatus(200);
    });
});

router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    Comment.find(function(err, commentList) {
        if (err) return console.error(err);
        else {
            res.json(commentList);
        }
    });
    
});

router.get('/query', function(req, res, next) {
    console.log("query: ", req.query);
    var myQuery = {Name: req.query.q};
    console.log(myQuery);
    Comment.find(myQuery, function (err, obj) {
        if (err) return console.error(err);
        else {
            res.json(obj);
        }
    });
});

router.delete('/comment', function(req, res, next) {
    console.log("delete route");
    Comment.find().deleteMany(function(err, commentList) {
        if (err) return console.error(err);
        else {
            console.log("Deleting all");
            console.log("Leftovers: ", commentList);
            res.sendStatus(200);
        }
    });
});

module.exports = router;
