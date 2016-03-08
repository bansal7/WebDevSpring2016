(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();