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
        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        // function creates a new user
        function createUser(user){
            return $http.post("/api/project/user", user);
        }

        // function deletes a user
        function deleteUserById(userId){
            //console.log(userId);
            return $http.delete("/api/project/user/" + userId);
        }

        // function updates a user entry
        function updateUser(userId,user){
            return $http.put("/api/project/user/" + userId, user);
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