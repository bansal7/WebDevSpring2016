(function(){
    angular
        .module("SplitUpApp")
        .controller("GroupDetailsController",GroupDetailsController);

    //var id = null;

    function GroupDetailsController($routeParams,$http,$scope,UserService) {

        //var vm = this;

        function init() {

            //id = tid;
            //UserService.setTransactionId(tid);
            var token = UserService.getToken();
            var URL = "https://www.buxfer.com/api/groups?&token=" + token;
            var req = {
                method: 'POST',
                url: "/api/usergroups",
                data: URL,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };

            $http(req).success(renderGroups);
        }

        init();


        function renderGroups(response) {
            var gid = $routeParams.id;
            //var number = response.response.numTransactions;
            var groups = (response.response.groups);
            //console.log(groups);
            for (var index in groups){
                if (groups[index].id == gid) {
                   $scope.group = {
                       id : groups[index].id,
                        name: groups[index].name,
                       members : members(groups[index].members)
                    }
                    break;
                }
            }
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