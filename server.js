var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var Post = require('./models/posts');



var app  = express();

app.use(bodyParser.json());

app.use(logger('dev'))

app.get('/api/posts', function (request, response,next) {
    console.log("GET request received");

    Post.find().then(function (err, posts) {
        if(err) {return next(err)};

        response.json(posts);
    });
});

app.post('/api/posts', function (request, response) {

    console.log("POST request received");


    // Post is mongoose model for post objects

    var post = new Post({
        username: request.body.username,
        body: request.body.body
    });

    console.log("Mongoose Post object created");

    post.save().then(function (result) {
        console.log(result);
        response.sendStatus(201).send(post);
    }, function ( err ) {
            console.log(err);
        });

    /**
    post.save(function (err,post) {
        if (err) { return next(err) }
        response.sendStatus(201).send(post);
    })

     **/



/***
    console.log('post received!');
    console.log(request.body.username);
    console.log(request.body.body);
    response.sendStatus(201);
 ***/



});

app.listen(3030, function () {
    console.log('Server listening on port',3030);
});