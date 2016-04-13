(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,UserService,$http, $location) {

        var vm = this;
        vm.user = {username:"bansalshah1993@gmail.com",
            password:"webdev2016"};
        vm.login = login;


        function login(user) {

            UserService.findUserByCredentials(user.username, user.password)
                .then(
                    function (user) {
                        var user = user.data;
                        var URL = "https://www.buxfer.com/api/login?&userid=" + "USERNAME" + "&password=" + "PASSWORD";

                        var a = URL.replace("USERNAME", user.username);
                        var b = a.replace("PASSWORD", user.password);
                        UserService.setCurrentUser(user);
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
                                console.log(token);
                                UserService.setToken(token)
                                    .then(function(response){
                                        console.log(" "  + response.data);
                                        $location.path("/profile");
                                    });


                                    //.then(function(response){
                                    //    $location.path("/profile");
                                    //});

                            });
                        }
                    });
        }
    }
})();