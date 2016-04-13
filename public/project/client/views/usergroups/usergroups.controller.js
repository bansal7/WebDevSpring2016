(function(){
    angular
        .module("SplitUpApp")
        .controller("UserGroupsController",UserGroupsController);

    function UserGroupsController($http, UserService) {

        var vm = this;

        //$scope.search = search;
        function init() {
            UserService.getToken()
                .then(function (response) {
                    var token = response.data;

                    var URL = "https://www.buxfer.com/api/groups?&token=" + token;

                    var req = {
                        method: 'POST',
                        url: "/api/usergroups",
                        data: URL,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    };

                    $http(req).success(renderGroups);
                });
        }

        init();
        function renderGroups(response){
            var groups = (response.response.groups);
            //console.log(groups);
            vm.data = groups;
        }
    }
})();