(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,UserService,$location) {

        $scope.login = login;

        function login(username, password) {

            UserService
                .findUserByCredentials(username, password)
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                })

        }
    }
})();