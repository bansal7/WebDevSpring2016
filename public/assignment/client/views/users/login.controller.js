(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,UserService,$location) {
        var vm = this;

        vm.login = login;

        function login(user) {

            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    //console.log(response.data);
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                })

        }
    }
})();