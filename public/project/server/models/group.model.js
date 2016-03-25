module.exports = function() {
    var groups = require("./group.mock.json");
    var q = require("q");

        var api = {
            //findGroupByCredentials : findGroupByCredentials,
            findGroupsByUser: findGroupsByUser,
            createGroup: createGroup,
            deleteGroupById: deleteGroupById,
            updateGroup: updateGroup
        }

        return api;


        // function finds all the users
        function findGroupsByUser(name) {
            //console.log(name);
            var deferred = q.defer();
            var userGroups = [];
            for (var index in groups) {
                if (groups[index].members.indexOf(name)>= 0) {
                    //console.log("I am inside the if");
                    userGroups.push(groups[index]);
                }
            }
            //console.log(userGroups);
            deferred.resolve(userGroups);
            return deferred.promise;
        }

        // function creates a new user
        function createGroup(group) {
            var deferred = q.defer();
            group._id = (new Date()).getTime();
            groups.push(group);
            deferred.resolve(groups);
            return deferred.promise;
        }

        // function deletes a user
        function deleteGroupById(groupId) {
            var deferred = q.defer();
            for (var index in groups) {
                if (groups[index]._id == groupId) {
                    groups.splice(index, 1);
                    break;
                }
            }
            deferred.resolve(groups);
            return deferred.promise;

        }

        // function updates a user entry
        function updateGroup(groupId, group) {
            var deferred = q.defer();
            var updatedUser = null;
            for (var index in groups) {
                if (groups[index]._id == groupId) {
                    groups[index] = group;
                    updatedUser = groups[index];
                    break;
                }
            }
            deferred.resolve(updatedUser);
            return deferred.promise;
        }
}