(function(){
    "use script";
    angular
        .module("SplitUpApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        // stores the data about all the users
        var users = {};

        users= [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "email": "alice@alice.com"   },
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "email": "bob@bob.com"		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "email": "charlie@charlie.com"		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "email": "dan@dan.com"},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "email": "edward@edward.com"		}
        ];

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        }

        return api;

        // funtion finds the user based on email and password
        function findUserByCredentials (username, password, callback){
            var user = null;
            for(var index in users){
                if(users[index].username==username && users[index].password==password){
                    user = users[index];
                    break;
                }
            }

            callback(user);

        }

        // function finds all the users
        function findAllUsers(callback) {
            callback(users);
        }

        // function creates a new user
        function createUser(user,callback){
            users.push(user);
            callback(user);
        }

        // function deletes a user
        function deleteUserById(userId,callback){
            for(var index in users){
                if(users[index]._id==userId){
                    users.splice(index,1);
                    break;
                }
            }

            callback(users);
        }

        // function updates a user entry
        function updateUser(userId,user,callback){
            for(var index in users){
                if(users[index]._id==userId){
                    users[index] = user;
                    callback(users[index]);
                    break;
                }
            }
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();