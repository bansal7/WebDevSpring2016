(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "../project_template/views/home/home.view.html"
            })
            .when("/user",{
                templateUrl: "views/users/user.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();