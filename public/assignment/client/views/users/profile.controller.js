"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $scope, $rootScope) {

        var vm = this;
        vm.update = update;

        var currentUser;

        function init(){
                UserService
                .getCurrentUser()
                    .then(function(response){
                        //console.log(response.data);
                        currentUser = response.data;
                        vm.loggedUser = response.data;
                        vm.loggedUser.emails = response.data.emails.join(",");
                    });
        }
        //$scope.loggedUser = UserService.getCurrentUser();
        init();

        function update (user) {
            var updatedUserObj = {
                "_id": currentUser._id,
                "username": currentUser.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "emails": user.emails.split(','),
                "roles": currentUser.roles
            };

            UserService
                .updateUser(currentUser._id, updatedUserObj)
                //.then(function() {
                //    return UserService.findUserByCredentials(user.username, user.password);
                //})
                .then(function(response){
                    if (response.data){
                        console.log(response.data);
                        UserService.setCurrentUser(updatedUserObj);
                        init();
                        //console.log("hooray!");
                    }
                });
        }
    }
})();