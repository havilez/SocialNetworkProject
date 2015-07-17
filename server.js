var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var Post = require('./models/posts');



var app  = express();

app.use(bodyParser.json());

app.use(logger('dev'));

app.use(express.static(__dirname + '/layouts'));

// bootstapping application - by serving up html
app.get("/", function (request,response) {
    console.log("GET recieved for / ");

    // works when using static data in angular code
    // problem seems to be when angular code makes http request to db
  response.sendfile('layouts/posts.html');

/***
    response.sendFile('layouts/posts.html').then(function (err, success) {
        if (err ) { return next(err) }
        console.log(success);
    })

 ***/

});

app.get('/api/posts', function (request, response, next) {
    console.log("GET request received for /api/posts");

    /**
    response.json([
        {
            username: 'static dickeyxxx',
            body: 'Node Rules!!!!'
        }
    ]);

     **/

    // need to make query more specific i.e load records but only with username and post fields
    var query = Post.find({});
    query.select( 'username body' );

    query.exec( function (err, posts) {
        console.log("Inside then promise method");


        if(err) {return next(err)};



        response.json(posts);
    });


    /**
    Post.findOne({}).then(function (err, posts) {
        console.log("Inside then promise method");

        if(err) {return next(err)};

        arrayPosts = [];
        arrayPosts = posts.toJSON();
        console.log( 'arrayPosts=' ,arrayPosts );

       response.json(arrayPosts);
    });

 **/

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


});

app.listen(3030, function () {
    console.log('Server listening on port',3030);
});