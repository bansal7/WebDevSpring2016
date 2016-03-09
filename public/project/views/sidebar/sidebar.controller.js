(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope,$http) {

        $scope.callApi=callApi;

        function callApi(){

            var req={
                method: 'POST',
                url: '/api',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }
        }

        $http(req).success(render);

        function render(response){
            console.log(response);
        }
    }

})();