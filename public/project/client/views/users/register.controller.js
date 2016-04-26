"use strict";

(function(){
    angular
        .module("SplitUpApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location, $http ) {

        var vm = this;

        vm.registerUser = registerUser;

        function registerUser (user) {

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

                $http(req).success(function(response) {
                    var token = response.response.token;
                    //console.log(token);
                    UserService.setToken(token);
                    UserService.createUser(user)
                        .then(function (response) {
                            if (response.data) {
                                //var user = response.data;
                                //console.log(user);
                                UserService.findUserByCredentials(user.username, user.password)
                                    .then(
                                        function (user) {
                                            //console.log(user);
                                            UserService.setCurrentUser(user);
                                            $location.path("/profile");
                                        });
                            }
                        });
                });
            }
        }
    }
})();