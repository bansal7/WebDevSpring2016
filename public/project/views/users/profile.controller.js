"use strict";

(function(){
    angular
        .module("SplitUpApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope) {
        $scope.update = update;
        var vm = this;
        vm.user = UserService.getCurrentUser();

        var token = UserService.getToken();

        function update (user) {
            // console.log("updating user" + us);
            UserService
                .updateUser(user._id, user)
                .then(function() {
                    return UserService.findUserByCredentials(user.username, user.password);
                })
                .then(function(response){
                    if (response.data){
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                        console.log("hooray!");
                    }
                });
        }
    }
})();