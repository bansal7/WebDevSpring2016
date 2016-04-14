module.exports = function(app,db,mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var q = require("q");
    var users = mongoose.model("user", UserSchema);


    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser (newUser) {
        var deferred = q.defer();
        users.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject (err);
            } else {
                deferred.resolve (doc);
            }
        });
        return deferred.promise;
    }

    function updateUser (id, user) {
        var deferred = q.defer();
        users
            .update (
                {_id: id},
                {$set: {
                    "password" : user.password,
                    "firstName" : user.firstName,
                    "lastName" : user.lastName,
                    "emails" : user.emails
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

    function findAllUsers () {
        var deferred = q.defer ();
        users.find (
            function (err, users) {
                if (!err) {
                    deferred.resolve (users);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function findUserById(userId) {
        return users.findById(userId);
    }

    function deleteUser (id) {
        var deferred = q.defer();
        users
            .remove (
                {_id: id},
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

    function findUserByUsername (username) {
        var deferred = q.defer ();
        users
            .findOne (
                {username: username},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        console.log( "dhfbgd  "  +credentials.username + " " + credentials.password );
        return users.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
}