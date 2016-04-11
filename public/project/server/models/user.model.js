module.exports = function(app,db,mongoose) {
    var ActorSchema = require("./user.schema.server.js")(mongoose);
    var q = require("q");
    var actors = mongoose.model("actor", ActorSchema);

    // stores the data about all the users
    var api = {
        findUserByCredentials : findUserByCredentials,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUser : updateUser
    }

    return api;

    // funtion finds the user based on email and password
    function findUserByCredentials (credentials){
        return actors.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }

    // function finds all the users
    function findAllUsers() {
        var deferred = q.defer ();
        actors.find (
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

    function findUserById (id) {
        //console.log(users);
        return actors.findById(userId);
    }

    // function creates a new user
    function createUser(newUser){
        var deferred = q.defer();
        actors.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject (err);
            } else {
                deferred.resolve (doc);
            }
        });
        return deferred.promise;
    }

    // function deletes a user
    function deleteUserById(userId){
        var deferred = q.defer();
        actors
            .remove (
                {_id: userId},
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
    function updateUser(userId,user){
        var deferred = q.defer();
        actors
            .update (
                {_id: userId},
                {$set: {
                    "password" : user.password,
                    "firstName" : user.firstName,
                    "lastName" : user.lastName,
                    "email" : user.email
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