(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {

        var vm = this;

        //vm.$location = $location;
        vm.logout = logout;

        function logout() {
            //$rootScope.currentUser = null;
            //$location.url("/home");
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();