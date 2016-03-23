(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("MainController", MainController);

    function MainController($scope, $location,$http) {
        $scope.$location = $location;
        $scope.api = api;

        function api(){
            $http.get("/api");
        }
    }
})();