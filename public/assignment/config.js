(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "../assignment/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "../assignment/views/users/register.view.html",
                controller : "RegisterController"
            })
            .when("/login", {
                templateUrl: "../assignment/views/users/login.view.html" ,
                controller : "LoginController"
            })
            .when("/profile", {
                templateUrl: "../assignment/views/users/profile.view.html",
                controller : "ProfileController"
            })
            .when("/admin", {
                templateUrl: "../assignment/views/admin/admin.view.html"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html"
            })

            .when("/fields", {
                templateUrl : "../assignment/views/forms/fields.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();