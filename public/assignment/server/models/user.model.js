module.exports = function() {
    var users = require("./user.mock.json");

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
        //var now = new Date();
        //newUser._id = "id" + now.getTime();
        users.push (newUser);

        return users;
    }

    function updateUser (id, user) {
        for (var index in users) {
            if (users[index]._id === id) {
                users[index].email = user.email;
            }
        }
    }

    function findAllUsers () {
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

    function deleteUser (id) {
        for (var index in users) {
            if (users[index]._id === id) {
                users.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    function findUserByUsername(username) {
        for (var index in users) {
            var currentUser = users[index];
            if (currentUser.username === username) {
                return currentUser;
            }
        }

        return null;
    }

    function findUserByCredentials(credentials) {
        for (var index in users) {
            var currentUser = users[index];
            if (currentUser.username === credentials.username && currentUser.password === credentials.password) {
                return currentUser;
            }
        }

        return null;
    }
}