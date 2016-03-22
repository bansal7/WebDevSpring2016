(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService, $rootScope) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();