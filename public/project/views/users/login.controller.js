(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,UserService,$http, $location) {

        $scope.login = login;
        var vm = this;
        vm.user = {username:"bansalshah1993@gmail.com",
                    password:"webdev2016"};


        function login(user) {

            UserService.findUserByCredentials(user.username, user.password,useApi);

            function useApi(user){
                //alert("sfdsdbs");
                var URL="https://www.buxfer.com/api/login?&userid="+ "USERNAME" + "&password=" + "PASSWORD";

                var a=URL.replace("USERNAME",user.username);
                var b=a.replace("PASSWORD",user.password);
                UserService.setCurrentUser(user);
                if(user!=null) {
                    var req = {
                        method: 'POST',
                        url: "/api",
                        data: b,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    };
                    //console.log(req.data);

                    $http(req).success(renderToken);
                }
                else {
                    alert("Error in useApi function");
                }
            }
        }

        function renderToken(response){
            //console.log(response);
            var token = response.response.token;
            console.log(token);
            UserService.setToken(token);
            $location.path("/profile");
        }
    }
})();