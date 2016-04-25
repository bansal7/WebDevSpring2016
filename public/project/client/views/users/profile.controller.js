"use strict";

(function(){
    angular
        .module("SplitUpApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService) {

        var vm = this;
        vm.updateUser = updateUser;
        var token = null;

        function init(){
            //console.log("Inside profile controller");
            UserService
                .getCurrentUser()
                .then(function(response){
                    //console.log(response.data);
                    vm.user = response.data;
                });

            UserService.getToken()
                .then(function (response) {
                    //console.log(response.data);
                    token = response.data;
                });
        }
        init();


        function updateUser (user) {
            // console.log("updating user" + us);
            UserService.updateUser(user._id, user)
                .then(function(response){
                    if (response) {
                        UserService.findUserByCredentials(user.username, user.password)
                            .then(function(response){
                                UserService.setCurrentUser(response.data);
                                init();
                            });
                    }
                    else{
                        //console.log(response);
                        console.log("error in profileUpdate");
                    }
                });
        }
    }
})();