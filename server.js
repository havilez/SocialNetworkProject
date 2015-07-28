var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');


var app  = express();

app.locals.pretty = true;
app.set("view engine", "jade");

app.use(bodyParser.json());

app.use(logger('dev'));



app.use('/api/posts',require('./controllers/api/posts'));

// similar to app.use('/',require('./controllers/static'))
app.use(require('./controllers/static'));

app.listen(3030, function () {
    console.log('Server listening on port',3030);
});