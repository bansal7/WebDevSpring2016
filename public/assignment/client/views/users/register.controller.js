"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService, $scope, $rootScope) {
        var vm = this;
        vm.register = register;
        vm.user = {};

        function register (user) {
            //$scope.user = registeredUser;

            var newUser = {
                firstName : null,
                lastName : null,
                username : user.username,
                password: user.password,
                email: user.email,
                roles: []
            };
            UserService
                .createUser(newUser)
                .then(function(response) {
                    //console.log(response);
                    if(response.data) {
                        //console.log(response.data);
                        vm.user = response.data;
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                        //console.log("current user is: " + response.data);
                    } else {
                        console.log("no data received!");
                    }
                });
        }
    }
})();