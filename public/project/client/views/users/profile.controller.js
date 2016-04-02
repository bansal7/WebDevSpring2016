"use strict";

(function(){
    angular
        .module("SplitUpApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope) {

        var vm = this;
        vm.updateUser = updateUser;
        var token = null;

            function init(){
            UserService
                .getCurrentUser()
                .then(function(response){
                    //console.log(response.data);
                    vm.user = response.data;
                });

             token = UserService.getToken();
        }
        init();


        function updateUser (user) {
            // console.log("updating user" + us);
            UserService.updateUser(user._id, user)
                .then(function(response){
                    if (response) {
                        console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                        //console.log("hooray!");
                    }
                    else{
                        console.log(response);
                        console.log("error in profileUpdate");
                    }
                });
        }
    }
})();