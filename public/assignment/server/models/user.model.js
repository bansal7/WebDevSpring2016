module.exports = function(app,db,mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var q = require("q");
    var users = mongoose.model("user", UserSchema);

    //User.create({
    //    "firstName": "Alice",
    //    "lastName": "Wonderland",
    //    "username": "alice",
    //    "password": "alice",
    //    "email": "alice@wonderland.com",
    //"roles":["student"]},
    //function (err,results) {
    //    if(!err){
    //        console.log(results);
    //    }
    //    else{
    //        console.log(err);
    //    }
    //});

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

    //function createUser (newUser) {
    //    //var now = new Date();
    //    //newUser._id = "id" + now.getTime();
    //    //newUser.roles =[];
    //    var deferred = q.defer();
    //    users.push (newUser);
    //
    //    deferred.resolve(newUser);
    //    return deferred.promise;
    //}

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

    //function findUserById (id) {
    //    var deferred = q.defer();
    //    //console.log(users);
    //    for (var index in users) {
    //        if (users[index]._id == id) {
    //            //return users[index];
    //            //console.log(users[index]);
    //            break;
    //        }
    //    }
    //    deferred.resolve(users[index]);
    //    return deferred.promise;
    //}

    function findUserById(userId) {
        return users.findById(userId);
    }

    //function deleteUser (id) {
    //    var deferred = q.defer();
    //    for(var index in users){
    //        if(users[index]._id==userId){
    //            users.splice(index,1);
    //            break;
    //        }
    //    }
    //    deferred.resolve(users);
    //    return deferred.promise;
    //}

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

    //function findUserByUsername(username) {
    //    var deferred = q.defer();
    //    var currentUser = null;
    //    for (var index in users) {
    //        currentUser = users[index];
    //        if (currentUser.username == username) {
    //            break;
    //        }
    //    }
    //    deferred.resolve(currentUser);
    //    return deferred.promise;
    //}

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

    //function findUserByCredentials(credentials) {
    //    var deferred = q.defer();
    //    var currentUser = null;
    //    for (var index in users) {
    //        currentUser = users[index];
    //        if (currentUser.username == credentials.username && currentUser.password == credentials.password) {
    //            console.log(currentUser);
    //            break;
    //        }
    //    }
    //    deferred.resolve(currentUser);
    //    return deferred.promise;
    //}

    function findUserByCredentials(credentials) {
        return users.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
}