"use strict";

(function(){
    angular
        .module("SplitUpApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location, $http ) {

        var vm = this;

        vm.registerUser = registerUser;

        function registerUser (user) {

            //console.log(user);
            // console.log("updating user" + us);
            UserService.createUser(user)
                .then(function(response){
                    if (response.data) {
                        //console.log(response.data);
                        //UserService.setCurrentUser(response.data);
                        //UserService.getCurrentUser();
                        //$location.path('/profile')
                        //console.log("hooray!");
                        var user = response.data;
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
                                            //console.log(token);
                                            UserService.setToken(token);
                                            $location.path("/profile");

                                            //.then(function(response){
                                            //    $location.path("/profile");
                                            //});

                                        });
                                    }
                                });
                    }
                    else{
                        console.log(response);
                        console.log("error in registering");
                    }
                });
        }
    }
})();