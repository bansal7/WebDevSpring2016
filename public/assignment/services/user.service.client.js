(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users =[
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        }

        return api;

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

        function findAllUsers(callback) {
           callback(users);
        }

        function createUser(user,callback){
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId,callback){
            for(var index in users){
                if(users[index]._id==userId){
                    users.splice(index,1);
                    break;
                }
            }

            callback(users);
        }

        function updateUser(userId,user,callback){
            for(var index in users){
                if(users[index]._id==userId){
                    users[index] = user;
                    callback(users[index]);
                    break;
                }
            }
        }
    }
})();