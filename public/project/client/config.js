(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller : "MainController"
            })
            .when("/user",{
                templateUrl: "views/users/user.view.html",
                controller : "UserController",
                controllerAs : "model"
            })
            .when("/bill",{
                templateUrl: "views/bills/bill.view.html",
                controller : "BillController",
                controllerAs: "model"
            })
            .when("/group",{
                templateUrl: "views/groups/group.view.html",
                controller : "GroupController"
            })
            .when("/note",{
                templateUrl: "views/notes/note.view.html",
                controller : "NoteController"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
                controllerAs : "model"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller : "ProfileController"
            })
            .when("/searchtransactions",{
                templateUrl: "views/transactions/transaction.view.html",
                controller : "TransactionController"
            })
            .when("/details/:id",{
                templateUrl: "views/details/details.view.html",
                controller : "DetailsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();