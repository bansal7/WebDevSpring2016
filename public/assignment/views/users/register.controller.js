(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,UserService,$location) {

        $scope.register = register;

        var currentUser = $rootScope;

        $scope.username = currentUser.username;
        $scope.firstName = currentUser.firstName;
        $scope.lastName = currentUser.lastName;


        function register(username, password, verifyPassword, email) {

            var newUser = {
                "_id": (new Date).getTime(),
                "firstName": null,
                "lastName": null,
                "username": username,
                "password": password,
                "roles": []
            }

            UserService.createUser( newUser, render);

            function render(user) {
                $rootScope = user;
                $location.path('/profile');
            }
        }
    }
})();