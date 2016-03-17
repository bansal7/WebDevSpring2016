(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,UserService,$location) {

        $scope.register = register;

        // function that registers a new user
        function register(username, password, verifyPassword, email) {

            if (password == verifyPassword) {

                var newUser = {
                    "_id": (new Date).getTime(),
                    "firstName": null,
                    "lastName": null,
                    "username": username,
                    "password": password,
                    "roles": []
                }
            }
            UserService
                .createUser(newUser)
                .then(function(response){
                    if(response.data) {
                        //$scope.user = response.data;
                        UserService.setCurrentUser(response.data);
                        $location.path("/profile");
                        console.log("current user is: " + response.data);
                    } else {
                        console.log("no data received!");
                    }
                });

        }
    }
})();