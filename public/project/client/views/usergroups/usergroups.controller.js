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
        //function renderGroups(response){
        //    var groups = (response.response.groups);
        //    //console.log(groups);
        //    vm.data = groups;
        //}

        function renderGroups(response) {
            //var number = response.response.numTransactions;
            var groups = (response.response.groups);
            //console.log(groups);
            var groupObj = [];
            //vm.data = groups;
            for (var index in groups){
                groupObj.push ({
                    id : groups[index].id,
                    name: groups[index].name,
                    members : members(groups[index].members)
                });
            }
            vm.data = groupObj;
        }

        function members(list){
            var membersList = [];
            for(var index in list){
                if (list[index].name == null) {
                    membersList.push("You");
                }
                else{
                    membersList.push(list[index].name);
                }
            }
            return membersList;
        }
    }
})();