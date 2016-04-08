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
                controllerAs: "model",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/bill",{
                templateUrl: "views/bills/bill.view.html",
                controller : "BillController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/group",{
                templateUrl: "views/groups/group.view.html",
                controller : "GroupController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
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
                controller : "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller : "RegisterController"
            })
            .when("/searchtransactions",{
                templateUrl: "views/transactions/transaction.view.html",
                controller : "TransactionController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/usergroups",{
                templateUrl: "views/usergroups/usergroups.view.html",
                controller : "UserGroupsController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/details/:id",{
                templateUrl: "views/details/details.view.html",
                controller : "DetailsController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/groupdetails/:id",{
                templateUrl: "views/details/groupdetails.view.html",
                controller : "DetailsController",

                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();