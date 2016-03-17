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
            UserService.createUser(newUser, render);
        }

       // function that actually adds a new user to static data
        function render(user) {
            UserService.setCurrentUser(user);
            $location.path('/profile');
        }
    }
})();