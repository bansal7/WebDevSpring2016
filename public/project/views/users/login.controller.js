(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,UserService,$http) {

        $scope.login = login;
        var vm = this;
        vm.user = {username:"bansalshah1993@gmail.com",
                    password:"webdev2016"};


        function login(user) {

            UserService.findUserByCredentials(user.username, user.password,useApi);

            function useApi(user){
                //alert("sfdsdbs");
                if(user!=null) {
                    $http.get("/api/"+ user.username + "/" + user.password)
                        .success(renderToken);
                }
                else {
                    alert("Error in useApi function");
                }
            }
        }

        function renderToken(response){
            console.log(response);
            var token = response.response.token;
            console.log(token);
        }
    }
})();