var Post = require('../../models/posts');

var router = require('express').Router();

router.get('/', function (request, response, next) {
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
    query.sort('-date');
    query.exec( function (err, posts) {
        console.log("Inside then promise method");


        if(err) {return next(err)};

        console.log("DB data= ", posts);

        response.json(posts);
    });
});

router.post('/', function (request, response, next) {

    // receive data from client and store in DB.
    console.log("POST request received");

    // Post is mongoose model for post objects
    var post = new Post({
        username: request.body.username,
        body: request.body.body
    });

    console.log("Mongoose Post object created");
/**
    post.save(function (err,result) {
        if ( err ) {
            console.log(err);
            return next(err);
        }
        console.log("result = ",result);
        // response.sendStatus(201).json(result);
        response.json(result);
    });
 **/


    post.save().then(function (result) {
        console.log("result = ",result);
        // response.sendStatus(201).json(result);
        response.status(201).json(result);
    }, function ( err ) {
        console.log(err);
        return next(err);
    });




});

module.exports = router;