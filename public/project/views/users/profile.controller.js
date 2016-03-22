"use strict";

(function(){
    angular
        .module("SplitUpApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope) {
        $scope.updateUser = updateUser;
        var vm = this;
        vm.user = UserService.getCurrentUser();

        var token = UserService.getToken();

        function updateUser (user) {
            // console.log("updating user" + us);
            UserService.updateUser(user._id, user, profileUpdate);


            function profileUpdate(response) {
                //console.log(response);
                if (response) {
                    UserService.setCurrentUser(response);
                    UserService.getCurrentUser();
                    //console.log("hooray!");
                }
                else{
                    console.log(response);
                    console.log("error in profileUpdate");
                }
            }
        }
    }
})();