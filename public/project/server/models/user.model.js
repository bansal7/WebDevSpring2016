module.exports = function() {
    var users = require("./user.mock.json");
    var q = require("q");

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
        var deferred = q.defer();
        var username = credentials.username;
        var password = credentials.password;

        var user = null;
        for(var index in users){
            if(users[index].username==username && users[index].password==password){
                user = users[index];
                break;
            }
        }
        //console.log(user);
        deferred.resolve(user);
        return deferred.promise;

    }

    // function finds all the users
    function findAllUsers() {
        var deferred = q.defer();
        deferred.resolve(users);
        return deferred.promise;
    }

    function findUserById (id) {
        //console.log(users);
        var deferred = q.defer();
        for (var index in users) {
            if (users[index]._id == id) {
                deferred.resolve(users[index]);
                //console.log(users[index]);
            }
        }
        return deferred.promise;
    }

    // function creates a new user
    function createUser(newUser){
        var deferred = q.defer();
        //var user = null;

        newUser._id = (new Date()).getTime();
        users.push(newUser);

        deferred.resolve(newUser);
        return deferred.promise;
        //return newUser;
    }

    // function deletes a user
    function deleteUserById(userId){
        var deferred = q.defer();
        for(var index in users){
            if(users[index]._id==userId){
                users.splice(index,1);
                break;
            }
        }
        deferred.resolve(users);
        return deferred.promise;
    }

    // function updates a user entry
    function updateUser(userId,user){
        var deferred = q.defer();
        var updatedUser = null;
        for(var index in users){
            if(users[index]._id==userId){
                users[index]._id = userId;
                users[index] = user;

                //console.log(user);
                updatedUser = users[index];
                //console.log(users[index]);
                break;
            }
        }
        deferred.resolve(updatedUser);
        return deferred.promise;
    }
}