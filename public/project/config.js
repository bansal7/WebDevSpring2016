(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/user",{
                templateUrl: "views/users/user.view.html",
                controller : "UserController"
            })
            .when("/bill",{
                templateUrl: "views/bills/bill.view.html",
                controller : "BillController"
            })
            .when("/group",{
                templateUrl: "views/groups/group.view.html",
                controller : "GroupController"
            })
            .when("/note",{
                templateUrl: "views/notes/note.view.html",
                controller : "NoteController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();