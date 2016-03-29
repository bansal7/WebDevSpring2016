"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $scope, $rootScope) {

        var vm = this;
        vm.update = update;
        //$scope.loggedUser = UserService.getCurrentUser();

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