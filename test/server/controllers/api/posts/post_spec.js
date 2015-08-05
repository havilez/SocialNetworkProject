var expect = require('chai').expect;

var should = require('should');


var api = require('../../../support/api');

var Post = require('../../../../../models/posts');



var ctrl = require('../../../../../controllers/api/posts');

describe('controllers.api.posts', function () {

    // clear out data for tests
    beforeEach(function (done) {
        Post.remove({}, done);
    });



    it('Posts controller exists', function () {
        expect(ctrl).to.exist;
    });

    describe('GET /api/posts', function () {

        // add three records
        beforeEach(function (done) {
            var posts = [
                {body: 'post1', username: 'dickeyxxx'},
                {body: 'post2', username: 'dickeyxxx' },
                {body: 'post3' , username: 'dickeyxxx'}
            ]

            Post.create(posts,done);
        });

        it('exists', function (done) {
            api.get('/api/posts')
                .expect(200)
               .end(done)
        });

        it('has 3 posts', function (done) {
            api.get('/api/posts')
                .expect(200)
                .expect(function (response) {
                    expect(response.body).to.have.length(3);
                })
                .end(done)
        });
    });

});






