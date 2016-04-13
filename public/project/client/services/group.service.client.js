(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .factory("GroupService", GroupService);

    function GroupService($rootScope,$http) {

        var api = {
            findGroupsByUser : findGroupsByUser,
            createGroup : createGroup,
            deleteGroupById : deleteGroupById,
            updateGroup : updateGroup
        }

        return api;


        // function finds all the users
        function findGroupsByUser(name) {
            //console.log(name);
            return $http.get("/api/project/group?username=" + name);
        }

        // function creates a new user
        function createGroup(group){
            return $http.post("/api/project/group", group);
        }

        // function deletes a user
        function deleteGroupById(groupId){
            return $http.delete("/api/project/group/" + groupId);
        }

        // function updates a user entry
        function updateGroup(groupId,group){
            //console.log("I am in group service on client side" + groupId + "   " + group);
            return $http.put("/api/project/user/" + groupId, group);
        }
    }
})();