(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("GroupController",GroupController);

    function GroupController($scope,GroupService) {

        $scope.data = {};
        GroupService.findAllGroups(renderGroups);



        // renders all the forms of the logged in user
        function renderGroups(response) {
            //console.log(response);
            $scope.data = response;
        }

        $scope.addGroup = addGroup;
        $scope.updateGroup = updateGroup;
        $scope.deleteGroup = deleteGroup;
        $scope.selectGroup= selectGroup;
        $scope.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addGroup(gName,members) {
            if (gName != null && members != null){
                var newGroup = {
                    "_id" : (new Date).getTime(),
                    "gName": gName,
                    "members" : members.split(",")
                }

                GroupService.createGroup(newGroup,renderAddGroup)
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Members cannot be empty")
            }
        }

        // function that actually adds a form after getting a response from the service
        function renderAddGroup(response){
            //console.log(response)
            //$scope.data.push(response);
            $scope.gName= null;
            $scope.members= null;
        }

        // function that updates a form of the user
        function updateGroup(gName,members) {
            if ((gName != null && members != null) && $scope.selectedIndex != -1) {
                var group = $scope.data[$scope.selectedIndex];
                var newGroup = {
                    "_id": group._id,
                    "gName": gName,
                    "members": members.split(",")
                }

                GroupService.updateGroup(group._id, newGroup, renderUpdateGroup)

            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Members cannot be empty")
            }
        }

        // function that actually updates a form afer getting response from the service
        function renderUpdateGroup(response){
            //$scope.data[$scope.selectedIndex] = response;
            //console.log(response);
            $scope.gName= null;
            $scope.members= null;
            $scope.selectedIndex = -1;
        }

        // function that deletes a form
        function deleteGroup(index){
            var group = $scope.data[index];

            GroupService.deleteGroupById(group._id,renderDeleteGroup)
        }

        // function that actually deletes the form and gets the rest of the form from the service
        function renderDeleteGroup(response){
            //$scope.data = response;
        }

        // function that selects the form to be updated
        function selectGroup(index) {
            $scope.selectedIndex = index;
            var group = $scope.data[index];
            $scope.gName= group.gName;
            $scope.members= group.members;
        }
    }
})();