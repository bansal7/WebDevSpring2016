(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("GroupController",GroupController);

    function GroupController(GroupService,UserService) {
        var vm = this;

        vm.data = {};
        var tempMembers = [];
        var name;

        function init(){
            tempMembers = [];
            UserService.getCurrentUser()
                .then(function(response){
                    name = response.data.firstName;
                    GroupService
                        .findGroupsByUser(name)
                        .then(function(response){
                            vm.data = response.data;
                        });
                });
            //console.log(name);
        }

        init();

        vm.addGroup = addGroup;
        vm.updateGroup = updateGroup;
        vm.deleteGroup = deleteGroup;
        vm.selectGroup= selectGroup;
        vm.shareGroup = shareGroup;
        vm.selectedIndex = -1;

        function shareGroup(name,user){

            tempMembers.push(user.firstName);

            vm.group = {
                name : name,
                members : tempMembers.join(",")
            };

        }

        // function that adds a new form to the users' list
        function addGroup(group) {
            if (group.name != null && group.members != null){
                var newGroup = {
                    //"_id" : (new Date).getTime(),
                    "name": group.name,
                    "members" : group.members.split(",")
                };
                //console.log(newGroup.members);
                UserService.getCurrentUser()
                    .then(function(response) {

                        name = response.data.firstName;
                        //console.log(name);
                        if (newGroup.members.indexOf(name) < 0) {
                            //console.log(newGroup.members);

                            newGroup.members.push(name);
                            //console.log(newGroup.members);
                            GroupService
                                .createGroup(newGroup)
                                .then(function(response){
                                    vm.group = null;
                                    init();
                                });
                        }
                    });

            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Members cannot be empty")
            }
        }

        // function that updates a form of the user
        function updateGroup(group) {
            if ((group.name != null && group.members != null) && vm.selectedIndex != -1) {
                var selectedGroup = vm.data[vm.selectedIndex];
                group.members = group.members.toString();
                var newGroup = {
                    "_id": selectedGroup._id,
                    "name": group.name,
                    "members": group.members.split(",")
                };
                //console.log(newGroup);
                if(newGroup.members.indexOf(name) < 0){
                    newGroup.members.push(name);
                }

                //console.log(newGroup);
                GroupService
                    .updateGroup(selectedGroup._id, newGroup)
                    .then(function(response){
                        //console.log(response.data);
                        vm.data[vm.selectedIndex] = newGroup;
                        vm.group = null;
                        vm.selectedIndex = -1;
                    });

            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Members cannot be empty")
            }
        }


        // function that deletes a form
        function deleteGroup(index){
            var group = vm.data[index];

            GroupService
                .deleteGroupById(group._id)
                .then(function(response){
                    init();
                });
        }

        // function that selects the form to be updated
        function selectGroup(index) {
            vm.selectedIndex = index;
            var selectedUser = vm.data[index];

            vm.group = {
                "name": selectedUser.name,
                "members": selectedUser.members
            };

            tempMembers = selectedUser.members;
        }
    }
})();