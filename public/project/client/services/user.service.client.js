(function(){
    "use script";
    angular
        .module("SplitUpApp")
        .factory("UserService", UserService);

    function UserService($rootScope,$http) {


        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            setToken : setToken,
            getToken : getToken
        }

        return api;

        // funtion finds the user based on email and password
        function findUserByCredentials (username, password){
            //console.log("I am in user service of client" + username + "   " + password);
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
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
            //console.log("I am here in service");
            for(var index in users){
                if(users[index]._id==userId){
                    users[index] = user;
                    callback(users[index]);
                    //console.log(users[index]);
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

        function setToken (token) {
            $rootScope.token = token;
        }

        function getToken () {
            return $rootScope.token;
        }
    }
})();