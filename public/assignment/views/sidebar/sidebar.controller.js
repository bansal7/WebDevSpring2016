(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope, UserService) {
        UserService.setCurrentUser(null);

        $scope.checkRootScope=checkRootScope;
        $scope.isAdmin=isAdmin;


        function checkRootScope() {
            if(UserService.getCurrentUser()==null){
                return true;
            }
            else{
                return false;
            }
        }

        function isAdmin(){
            if(UserService.getCurrentUser()!=null)
            {
                var roles=UserService.getCurrentUser().roles;
                if(roles!=null){
                    for(var index in roles){
                        if(roles[index] == "admin"){
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }
})();