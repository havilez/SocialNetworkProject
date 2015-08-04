var expect = require('chai').expect;

var should = require('should');


var api = require('../../../support/api');



var ctrl = require('../../../../../controllers/api/posts');

describe('controllers.api.posts', function () {

    it('exists', function () {
        expect(ctrl).to.exist;
    });

    describe('GET /api/posts', function () {
        it('exists', function (done) {
            api.get('/api/posts')
                .expect(200)
               .end(done)
        })
    });

});






