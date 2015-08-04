var express = require('express');

var logger = require('morgan');


var app  = express();

app.locals.pretty = true;
app.set("view engine", "jade");


app.use(logger('dev'));

app.use(require('./controllers')); // call posts controller middleware


// load  posts api
app.use('/api/posts',require('./controllers/api/posts'));



var port = process.env.PORT || 3030;
var server = app.listen(port , function () {
    console.log('Server listening on port',port);
});