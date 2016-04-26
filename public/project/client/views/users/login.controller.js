(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,UserService,$http, $location) {

        var vm = this;
        vm.login = login;


        function login(user) {

            UserService.findUserByCredentials(user.username, user.password)
                .then(
                    function (response) {
                        var loginUser = response.data;
                        loginUser.password = user.password
                        var URL = "https://www.buxfer.com/api/login?&userid=" + "USERNAME" + "&password=" + "PASSWORD";

                        var a = URL.replace("USERNAME", user.username);
                        var b = a.replace("PASSWORD", user.password);

                        if (user != null) {
                            var req = {
                                method: 'POST',
                                url: "/api",
                                data: b,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            };
                            //console.log(req.data);

                            $http(req).success(function(response){
                                var token = response.response.token;
                                //console.log(token);
                                UserService.setToken(token)
                                    .then(function(response){
                                        //console.log(" "  + response.data);
                                        UserService.setCurrentUser(user);
                                        $location.path("/profile");
                                    });
                            });
                        }
                    });
        }
    }
})();