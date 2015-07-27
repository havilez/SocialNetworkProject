var app = angular.module('app', []);

app.service("PostsSvc", function ($http) {
    this.fetch = function () {
        return $http.get('/api/posts');
    };
    this.create = function (post) {
        return $http.post('/api/posts', post);
    }
})

app.controller('PostsCtrl', function ($scope, PostsSvc) {

    // retrieve posts data from db upon this file being loaded via "/" route on server

    $scope.posts = [
        {
            _id : "",
            username: 'static dickeyxxx',
            body: 'Node Rules!!!!'
        }
    ];


    $scope.addPost = function () {
        // if user input has data
        if ($scope.postBody ) {

            // causing mongo db daemon to crash

            PostsSvc.create( {
                username: 'new_dickeyxxx',
                body: $scope.postBody
            }).success(function (post,status) {
                if (post=="Created") {
                    console.log("Return status = ", status, "Data= ", post);
                    // can cheat by using input sent to server instead of actual data
                }
                else {
                    console.log("Saved post = ", post);
                    $scope.posts.unshift(post);

                    $scope.postBody = null; // clear out gui input data
                }

            }).error( function( err ) {
                console.log("Post error = ", err );
            });

            /**
             $scope.posts.unshift({
                        username: 'dickeyxxx' ,
                        body: $scope.postBody
                    })
             **/

        }

    };  // addPost()  end

    PostsSvc.fetch().success(function(posts) {
        console.log("Received posts:");
        console.log(posts);
        $scope.posts = posts;
    }).error( function ( error ) {
        console.log("error= ",error);
    });

})