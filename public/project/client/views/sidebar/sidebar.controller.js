(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("SidebarController",SidebarController);

    function SidebarController(UserService) {

        var vm = this;
        UserService.getCurrentUser()
            .then(function(response){
                vm.currentUser = response.data;
            });
    }
})();