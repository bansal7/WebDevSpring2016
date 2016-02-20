(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location) {

        $rootScope=null;

        $scope.checkRootScope=checkRootScope;
        $scope.updateRootScope=updateRootScope;
        $scope.isAdmin=isAdmin;


        function checkRootScope() {
            if($rootScope==null){
                return true;
            }
            else{
                $scope.username=$rootScope.username;
                return false;
            }
        }

        function updateRootScope() {
            $rootScope=null;
        }

        function isAdmin(){
            if($rootScope!=null)
            {
                var roles=$rootScope.roles;
                if(roles!=null){
                    for(var index in roles){
                        if(roles[index] == "admin"){
                            $location.path('/admin')
                        }
                    }
                }
            }
        }
    }
})();