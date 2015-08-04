var express = require('express');
var request = require('supertest');
var router = require('../../../controllers/index');

var app = express();

app.use(router);


module.exports = request(app);