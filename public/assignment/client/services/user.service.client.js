(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope,$http) {

        var model = {
            findUserByUsername: findUserByUsername,
            //findUserByCredentials : findUserByCredentials,
            findUserById : findUserById,
            findAllUsers : findAllUsers,
            createUser : createUser,
            register : register,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            updateUserAdmin : updateUserAdmin,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout : logout,
            login: login
        };

        return model;

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function login(user){
            return $http.post("/api/assignment/login", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        // funtion finds the user based on username and password
        //function findUserByCredentials(username, password) {
        //    //console.log("inside login");
        //    return $http.post("/api/assignment/login?username=" + username + "&password=" + password);
        //}

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        // function finds all the users
        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        // function creates a new user
        function createUser(user) {
            //user._id = (new Date).getTime();
            //console.log(user + "   ksdbgshb");
            return $http.post("/api/assignment/admin/user", user);
        }

        function register(user){
            return $http.post("/api/assignment/register", user);
        }

        // function deletes a user
        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        // function updates a user entry
        function updateUser(userId, user) {
            //console.log("sending: " + "/api/assignment/user/" + userId, user);
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function updateUserAdmin(userId,user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            //return $rootScope.currentUser;
            return $http.get("/api/assignment/loggedin");
        }
    }
})();