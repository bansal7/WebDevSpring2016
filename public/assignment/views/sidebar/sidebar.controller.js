(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope) {
        $rootScope=null;

        $scope.checkRootScope=checkRootScope;
        $scope.isAdmin=isAdmin;


        function checkRootScope() {
            if($rootScope==null){
                return true;
            }
            else{
                return false;
            }
        }

        function isAdmin(){
            if($rootScope!=null)
            {
                var roles=$rootScope.roles;
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