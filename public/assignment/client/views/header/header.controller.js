(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, UserService) {

        //UserService.setCurrentUser(null);

        $scope.checkRootScope=checkRootScope;
        $scope.updateRootScope=updateRootScope;
        $scope.isAdmin=isAdmin;

        // function that checks if the user is logged in or not
        function checkRootScope() {
            if(UserService.getCurrentUser()==null){
                return true;
            }
            else{
                $scope.username=UserService.getCurrentUser().username;
                return false;
            }
        }

        // function that checks if the user has logged out
        function updateRootScope() {
            UserService.setCurrentUser(null);
        }

        // function that checks if the logged in user is  of admin role
        function isAdmin(){
            if(UserService.getCurrentUser()!=null) {
                var roles=UserService.getCurrentUser().roles;
                if(roles.indexOf('admin') >= 0) {
                        return true;
                    }
                else {
                    return false;
                }
            }
            return false;
        }
    }
})();