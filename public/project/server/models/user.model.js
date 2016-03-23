module.exports = function() {
    var users = require("./user.mock.json");

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
    function findUserByCredentials (username, password){
        var user = null;
        for(var index in users){
            if(users[index].username==username && users[index].password==password){
                user = users[index];
                break;
            }
        }
        //console.log(user);
        return user;

    }

    // function finds all the users
    function findAllUsers() {
        return users;
    }

    function findUserById (id) {
        //console.log(users);
        for (var index in users) {
            if (users[index]._id == id) {
                return users[index];
                //console.log(users[index]);
            }
        }
        return null;
    }

    // function creates a new user
    function createUser(user){
        users.push(user);
        return user;
    }

    // function deletes a user
    function deleteUserById(userId){
        for(var index in users){
            if(users[index]._id==userId){
                users.splice(index,1);
                break;
            }
        }

        return users;
    }

    // function updates a user entry
    function updateUser(userId,user){
        //console.log("I am here in service");
        for(var index in users){
            if(users[index]._id==userId){
                users[index] = user;
                return users[index];
                //console.log(users[index]);
                break;
            }
        }
    }
}