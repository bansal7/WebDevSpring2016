"use strict";

(function(){
    angular
        .module("SplitUpApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location) {

        var vm = this;

        vm.registerUser = registerUser;

        function registerUser (user) {

            //console.log(user);
            // console.log("updating user" + us);
            UserService.createUser(user)
                .then(function(response){
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                        $location.path('/profile')
                        //console.log("hooray!");
                    }
                    else{
                        console.log(response);
                        console.log("error in registering");
                    }
                });
        }
    }
})();