"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService, $scope, $rootScope) {
        var vm = this;
        vm.register = register;
        vm.user = {};

        function register (newUser) {
            //$scope.user = registeredUser;
            UserService
                .createUser(newUser)
                .then(function(response) {
                    console.log(response);
                    if(response.data) {
                        $scope.user = response.data;
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                        console.log("current user is: " + response.data);
                    } else {
                        console.log("no data received!");
                    }
                });
        }
    }
})();