  module.exports = function(app,db,mongoose) {

      var GroupSchema = require("./group.schema.server.js")(mongoose);
      var q = require("q");
      var groups = mongoose.model("group", GroupSchema);

        var api =
        {
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
            var deferred = q.defer ();
            groups.find( { members: name },
                    function (err, groups) {
                        if (!err) {
                            deferred.resolve(groups);
                        } else {
                            deferred.reject(err);
                        }
                    });
            return deferred.promise;
        }

        // function creates a new user
        function createGroup(group) {
            {
                var deferred = q.defer();
                var newGroup = {
                    name: group.name,
                    members : group.members
                };
                //console.log("  " + newGroup);
                groups.create(newGroup, function (err, doc) {
                    if (err) {
                        deferred.reject (err);
                    } else {
                        deferred.resolve (doc);
                    }
                });
                return deferred.promise;
            }
        }

        // function deletes a user
        function deleteGroupById(groupId) {
            var deferred = q.defer();
            groups
                .remove (
                    {_id: groupId},
                    function (err, stats) {
                        if (!err) {
                            deferred.resolve(stats);
                        } else {
                            deferred.reject(err);
                        }
                    }
                );
            return deferred.promise;
        }

        // function updates a user entry
        function updateGroup(groupId, group) {
            var deferred = q.defer();
            groups
                .update (
                    {_id: groupId},
                    {$set: {
                        name : group.name,
                        members : group.members
                    }},
                    function (err, stats) {
                        if (!err) {
                            deferred.resolve(stats);
                            //console.log(stats);
                        } else {
                            deferred.reject(err);
                        }
                    }
                );
            return deferred.promise;
        }
}