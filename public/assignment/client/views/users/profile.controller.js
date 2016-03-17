(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService,$location) {

        $scope.update = update;

        //var currentUser = UserService.getCurrentUser();

        $scope.username = UserService.getCurrentUser().username;
        $scope.firstName = UserService.getCurrentUser().firstName;
        $scope.lastName = UserService.getCurrentUser().lastName;
        $scope.password = UserService.getCurrentUser().password;

        // function that updates a profile of the user with new details
        function update(password, firstName, lastName, email) {

            var newUser = {
                "_id": UserService.getCurrentUser()._id,
                "firstName": firstName,
                "lastName": lastName,
                "username": UserService.getCurrentUser().username,
                "password": password,
                "roles": UserService.getCurrentUser().roles
            };

            UserService
                .updateUser(UserService.getCurrentUser()._id, newUser)
                .then(function(){
                    return UserService.findUserByCredentials(newUser.username, newUser.password);
                })
                .then(function(response){
                if (response.data){
                    UserService.setCurrentUser(response.data);
                    console.log("hooray!");
                }
            });
        }
    }
})();