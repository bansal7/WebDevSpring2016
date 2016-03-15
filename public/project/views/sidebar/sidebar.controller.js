(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope,$http) {

        $scope.callApi=callApi;
        console.log("Hello");
        function callApi() {
            console.log("Hiii from inside the api call...");
            var req = {
                method: 'POST',
                url: '/api',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }

            $http(req).success(render);
        }
        function render(response){
            console.log(response);
        }
    }
})();